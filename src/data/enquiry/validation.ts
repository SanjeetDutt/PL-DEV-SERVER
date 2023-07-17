export default {
	FIRSTNAME: (values: string[]) => {
		if (values.length > 1) return 'ONLY ONE ANSWER IS ALLOWED';

		if (values.length === 1 && values[0].length < 4) return 'PLEASE ENTER A VALID FIRST NAME';

		return true;
	}
};
