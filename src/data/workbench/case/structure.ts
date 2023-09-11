import { getUniqueNumber } from '../../../util/CommonFunctions';

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
	underWriter: Person;
	receivedDate: Date;
	dueDate: Date;
  status;
	userResponse: {};

	constructor({ id, employee, employer, underWriter, receivedDate, dueDate, userResponse }) {
		this.id = !!id ? id : getUniqueNumber().toString();
		this.employee = employee && new Person(employee);
		this.employer = employer && new Person(employer);
		this.underWriter = underWriter && new Person(underWriter);
		this.receivedDate = new Date(receivedDate);
		this.dueDate = new Date(dueDate);
		this.userResponse = userResponse; // TODO: NOT COMPLETED YET
	}
}

export class Person {
	firstName: string;
	lastName: string;
	gender: 'Female' | 'Male' | 'NonBinary' | 'NotSpecified' | '';
	dateOfBirth: Date;
	relation: string;

	constructor({ firstName, lastName, gender, dateOfBirth, relation, age }) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.dateOfBirth = !!dateOfBirth ? new Date(dateOfBirth) : this.getDOB(age);
		this.relation = relation;
	}

  getFullName(){
    return this.firstName + " " + this.lastName;
  }

	getDOB(age: number) {
		const date = new Date();
		date.setDate(date.getDate() - age * 12 * 30);
		return date;
	}

  getAge(){
    const today = new Date()
    return today.getFullYear() - this.dateOfBirth.getFullYear()
  }
}
