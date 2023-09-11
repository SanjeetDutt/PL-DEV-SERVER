import { getUniqueNumber } from '../../util/CommonFunctions';

export class Person {
	id: string;
	firstName: string;
	lastName: string;
	gender: 'Female' | 'Male' | 'NonBinary' | 'NotSpecified' | '';
	dateOfBirth: Date;
	relation: string;

	constructor({ id, firstName, lastName, gender, dateOfBirth, relation, age }) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.dateOfBirth = !!dateOfBirth ? new Date(dateOfBirth) : this.getDOB(age);
		this.relation = relation;

		this.id = !!id ? id : getUniqueNumber().toString();
	}

	public getFullName() {
		return this.firstName + ' ' + this.lastName;
	}

	getDOB(age: number) {
		const date = new Date();
		date.setDate(date.getDate() - age * 12 * 30);
		return date;
	}

	getAge() {
		const today = new Date();
		return today.getFullYear() - this.dateOfBirth.getFullYear();
	}
}
