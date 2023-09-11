import fs from 'node:fs/promises';

export const checkOrCreateFile = async (fileName: string, defaultValue: string = '{}') => {
	try {
		await fs.readFile(fileName, 'utf8');
	} catch {
		// make new file
		fs.writeFile(fileName, defaultValue);
	}
};

export const readFile = async (fileName: string) => {
	return await fs.readFile(fileName, 'utf8');
};

export const writeFile = async (fileName: string, data: object) => {
	await fs.writeFile(fileName, JSON.stringify(data));
};

export const getUniqueNumber = () => {
	const max = new Date();
	const min = new Date(2023, 0, 1);

	return (Math.random() * (max.getTime() - min.getTime())).toFixed(0);
};
