import { getUniqueNumber } from '../../../util/CommonFunctions';
import { Person } from '../Person';
import { Underwriter } from '../underWriter/structure';
import {getUnderWriter} from "../underWriter/main"

export const CASE_STATUS = {
	APPROVED: 'APPROVED',
	DECLINED: 'DECLINED',
	PENDING: 'PENDING',
	UNDER_APPEL: 'UNDER_APPEL'
};

export class Case {
	id: string;
	employee: Person;
	employer: Person;
	underWriter: Underwriter;
	receivedDate: Date;
	dueDate: Date;
	userResponse: {};

	constructor({ id, employee, employer, underWriter, receivedDate, dueDate, userResponse }) {
		this.id = !!id ? id : getUniqueNumber().toString();
		this.employee = employee && new Person(employee);
		this.employer = employer && new Person(employer);
		this.underWriter = underWriter && new Underwriter(underWriter);
		this.receivedDate = new Date(receivedDate);
		this.dueDate = new Date(dueDate);
		this.userResponse = userResponse; // TODO: NOT COMPLETED YET
	}
}
