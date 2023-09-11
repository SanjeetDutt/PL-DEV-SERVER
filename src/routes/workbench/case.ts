import { Request, Response, Router } from 'express';
import { saveCase, getAllCase, getCaseById } from '../../data/workbench/case/main';
import { Case } from '../../data/workbench/case/structure';
const router = Router();

const formateDate = (date: Date) => date.toISOString().split('T')[0];

const parseCaseList = (_case: Case[]) =>
	_case.map((c) => {
		return {
			id: c.id,
			employeeDetails: {
				firstName: c.employee.firstName,
				lastName: c.employee.lastName
			},
			employer: c.employer.getFullName(),
			Underwriter: c.underWriter.getFullName(),
			receivedDate: formateDate(c.receivedDate),
			dueDate: formateDate(c.dueDate),
			status: 'TODO'
		};
	});

const parseCaseDetails = (c: Case) => {
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
		underwriter: c.underWriter.getFullName(),
		userResponse: c.userResponse
	};
};

// Will create a new case
router.post('/new', async (req: Request<{}, {}, Case>, res: Response) => {
	await saveCase(new Case(req.body));
	const cases = await getAllCase();
	res.status(200).json(parseCaseList(cases));
});

router.get('/', async (req: Request, res: Response) => {
	const cases = await getAllCase();
	res.status(200).json(parseCaseList(Object.values(cases)));
});

router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
	const caseId = req.params.id;
	const _case = await getCaseById(caseId);
	res.status(200).json(parseCaseDetails(_case));
});

export default router;
