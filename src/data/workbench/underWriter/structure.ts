import { Person } from '../Person';

export class Underwriter extends Person {
	constructor(param: any) {
		super(param);
	}

	getFullName(): string {
		return super.getFullName();
	}
}
