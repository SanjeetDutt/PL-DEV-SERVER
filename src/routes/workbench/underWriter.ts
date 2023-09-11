import { Router, Request, Response } from 'express';
import { Underwriter } from '../../data/workbench/underWriter/structure';
import { saveUnderWriter, getAllUnderwritters } from '../../data/workbench/underWriter/main';

const router = Router();

const parseUnderWriter = (underwriter: Underwriter) => {
	console.log(underwriter);

	return {
		id: underwriter.id,
		fullName: underwriter.getFullName()
	};
};

router.post('/new', async (request: Request<{}, {}, Underwriter>, response: Response) => {
	const req = request.body;
	const writer = new Underwriter(req);
	await saveUnderWriter(writer);
	const underWriters = await getAllUnderwritters();
	response.status(200).json(underWriters.map((e) => parseUnderWriter(e)));
});

router.get('/', async (request: Request, response: Response) => {
	const underWriters = await getAllUnderwritters();
	response.status(200).json(underWriters.map((e) => parseUnderWriter(e)));
});

export default router;
