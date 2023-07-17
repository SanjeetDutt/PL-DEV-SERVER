export default {
	FIRSTNAME: (values: string[]): string | boolean => {
		if (values.length > 1) return 'ONLY ONE ANSWER IS ALLOWED';

		if (values.length === 1 && values[0].length < 4) return 'PLEASE ENTER A VALID FIRST NAME';

		return true;
	},
	GENDER: (values: string[]): string | boolean => {
		if (values.length > 1) return 'ONLY ONE ANSWER IS ALLOWED';

		if (values.length === 1) {
			if (!['MALE', 'FEMALE'].includes(values[0])) {
				return 'PLEASE SELECT VALID GENDER';
			}
		}

		return true;
	}
};
