import express, { NextFunction, Request, Response } from 'express';
import { newEnquiry, getResponse, saveResponse } from '../data/enquiry/main';
import fs from 'node:fs/promises';

const router = express.Router();

export const CONSTANTS = {
	ENQUIRY_FILE: './enquries.json',
	QUESTION_FILE: './questions.json',
	BRANCH: 'PL',
	TAG: 'PL'
};

const checkOrCreateFile = async (fileName: string, defaultValue: string = '{}') => {
	try {
		await fs.readFile(fileName, 'utf8');
	} catch {
		// make new file
		fs.writeFile(fileName, defaultValue);
	}
};

checkOrCreateFile(CONSTANTS.ENQUIRY_FILE);
checkOrCreateFile(CONSTANTS.QUESTION_FILE);

// Call to create a new enquiry
router.post('/startEnquiry', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const enquiry = await newEnquiry();
		const enquiryResponse = await getResponse(enquiry);
		res.status(200).json(enquiryResponse);
	} catch (error) {
		next(error);
	}
});

// Call to create a new enquiry
router.get('/getEnquiry/:enquiryId', async (req: Request<{ enquiryId: string }, {}, {}>, res: Response, next: NextFunction) => {
	try {
		const enquiryResponse = await getResponse(req.params.enquiryId);
		res.status(200).json(enquiryResponse);
	} catch (error) {
		next(error);
	}
});

// Post the response of a question
router.post('/save-response/:enquiryId', async (req: Request<{ enquiryId: string }, {}, { response: { [key: string]: string[] } }>, res: Response, next: NextFunction) => {
	const enquiryId = req.params.enquiryId;
	const responses = req.body.response;

	for (const questionName of Object.keys(responses)) {
		if (!(await saveResponse(enquiryId, questionName, responses[questionName]))) {
			console.error('ERROR WHILE SAVING RESPONSE FOR QUESTION : ' + questionName);
		}
	}

	const response = await getResponse(enquiryId);
	res.status(200).json(response);
});

export default router;
