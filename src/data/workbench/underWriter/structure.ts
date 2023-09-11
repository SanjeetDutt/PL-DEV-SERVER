import { Person } from '../Person';

export class Underwriter extends Person {
	constructor(param: any) {
		super(param);
	}

	getFullName(): string {
		console.log(super.getFullName);

		return super.getFullName();
	}
}
