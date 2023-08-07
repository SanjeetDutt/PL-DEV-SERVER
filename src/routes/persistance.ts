import express, { NextFunction, Request, Response } from 'express';
import { checkOrCreateFile } from '../util/CommonFunctions';
import { createNewInterviewId, createPersistance, fetchPersistance, PROGRESS_NAMES, persistanceUpdates } from '../data/persistance/main';
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
			res.status(500).json({ error: 'invalid interview id' });
			return;
		} else {
			res.status(200).json(persistance);
		}
	} catch (error) {
		next(error);
	}
});

router.post('/update/:interviewId/:updateType', async (req: Request<{ interviewId: string; updateType: string }, {}, { value: string }>, res: Response, next: NextFunction) => {
	try {
		let persistance = await fetchPersistance(req.params.interviewId);

		if (!persistance) {
			res.status(500).json({ error: 'invalid interview id' });
			return;
		}

		switch (req.params.updateType) {
			case 'email':
				persistance = await persistanceUpdates.updateEmail(req.params.interviewId, req.body.value);
				break;

			case 'spouse-email':
				if (persistance.limra.employer[0].employee[0].dependent.length == 0) {
					res.status(500).json({ error: 'no spouse found for given interview id' });
					return;
				} else {
					persistance = await persistanceUpdates.updateSpouseEmail(req.params.interviewId, req.body.value);
				}
				break;

			default:
				res.status(500).json({ error: 'invalid update expected' });
				return;
		}

		res.status(200).json(persistance);
	} catch (error) {
		next(error);
	}
});

router.post('/update-status/:interviewId', async (req: Request<{ interviewId: string; processName: string }, {}, { processCompleted: string }>, res: Response, next: NextFunction) => {
	try {
		let persistance = await fetchPersistance(req.params.interviewId);

		if (!persistance) {
			res.status(500).json({ error: 'invalid interview id' });
			return;
		}

		const processArray = Object.keys(PROGRESS_NAMES);

		const processName = req.body.processCompleted.toUpperCase();

		if (!processArray.includes(processName)) {
			res.status(500).json({ error: 'invalid process name' });
			return;
		}

		const completedStep = PROGRESS_NAMES[processName];
		persistance = await persistanceUpdates.updateProgressTo(req.params.interviewId, completedStep);

		res.status(200).json(persistance);
	} catch (error) {
		next(error);
	}
});

router.post('/complete-esign/:interviewId', async (req: Request<{ interviewId: string }, {}, {}>, res: Response, next: NextFunction) => {
	try {
		let persistance = await fetchPersistance(req.params.interviewId);

		if (!persistance) {
			res.status(500).json({ error: 'invalid interview id' });
			return;
		}

		persistance = await persistanceUpdates.completeEsign(req.params.interviewId);

		res.status(200).json(persistance);
	} catch (error) {
		next(error);
	}
});

export default router;
