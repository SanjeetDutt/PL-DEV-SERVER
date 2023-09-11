import { Request, Response, Router } from 'express';
import { saveCase, getAllCase, getCaseById } from '../../data/workbench/case/main';
import { Case } from '../../data/workbench/case/structure';
import { getUnderWriter } from '../../data/workbench/underWriter/main';
const router = Router();

const formateDate = (date: Date) => date.toISOString().split('T')[0];

const parseCaseList = async (_case: Case[]) => {
	const ca = _case.map(async (c) => {
		const underWriter = await getUnderWriter(c.underWriter.id);

		return {
			id: c.id,
			employeeDetails: {
				firstName: c.employee.firstName,
				lastName: c.employee.lastName
			},
			employer: c.employer.getFullName(),
			Underwriter: underWriter.getFullName(),
			receivedDate: formateDate(c.receivedDate),
			dueDate: formateDate(c.dueDate),
			status: 'TODO'
		};
	});

	const mappedCase = await Promise.all(ca);

	return mappedCase;
};

const parseCaseDetails = async (c: Case) => {
	const underWriter = await getUnderWriter(c.underWriter.id);
	return {
		id: c.id,
		employeeDetails: {
			firstName: c.employee.firstName,
			lastName: c.employee.lastName,
			age: c.employee.getAge(),
			gender: c.employee.gender,
			dob: formateDate(c.employee.dateOfBirth),
			relationToEmployee: c.employee.relation
		},
		employer: c.employer.getFullName(),
		underwriter: underWriter.getFullName(),
		userResponse: c.userResponse
	};
};

// Will create a new case
router.post('/new', async (req: Request<{}, {}, Case>, res: Response) => {
	const _case = req.body;
	_case.underWriter = await getUnderWriter(_case.underWriter.id);

	await saveCase(new Case(req.body));
	const cases = await getAllCase();
	const parsed = await parseCaseList(cases);
	res.status(200).json(parsed);
});

router.get('/', async (req: Request, res: Response) => {
	const cases = await getAllCase();
	const parsed = await parseCaseList(Object.values(cases));
	res.status(200).json(parsed);
});

router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
	const caseId = req.params.id;
	const _case = await getCaseById(caseId);
	const parsed = await parseCaseDetails(_case);
	res.status(200).json(parsed);
});

export default router;
