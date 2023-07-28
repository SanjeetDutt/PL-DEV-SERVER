import express, { NextFunction, Request, Response } from 'express';
import { checkOrCreateFile } from '../util/CommonFunctions';
import { createNewInterviewId, createPersistance, fetchPersistance } from '../data/persistance/main';
import { newEnquiry } from '../data/enquiry/main';

const router = express.Router();

export const CONSTANTS = {
	PERSISTANCE_FILE: './persistance-store.json'
};

checkOrCreateFile(CONSTANTS.PERSISTANCE_FILE);

router.get('/create', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const interviewID = createNewInterviewId();
		await createPersistance(interviewID);
		await newEnquiry(interviewID);
		res.status(200).json(interviewID);
	} catch (error) {
		next(error);
	}
});

router.get('/fetch/:interviewId', async (req: Request<{ interviewId: string }>, res: Response, next: NextFunction) => {
	try {
		const persistance = await fetchPersistance(req.params.interviewId);
		if (!persistance) {
			res.status(500).json({ error: 'invaild interview id' });
			return;
		} else {
			res.status(200).json(persistance);
		}
	} catch (error) {
		next(error);
	}
});

export default router;
