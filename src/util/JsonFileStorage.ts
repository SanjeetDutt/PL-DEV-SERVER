import { checkOrCreateFile, readFile, writeFile } from './CommonFunctions';

export class JsonFileStorage<Data> {
	location: string;

	constructor(location: string) {
		checkOrCreateFile(location);
		this.location = location;
	}

	async getAll(): Promise<{ [key: string]: Data }> {
		let data = null;

		while (!data) {
			data = await readFile(this.location);
		}

		return JSON.parse(data);
	}

	async getById(id: string): Promise<Data> {
		const data = await this.getAll();

		if (data && data[id]) return data[id];

		return null;
	}

	async saveData(id: string, newData: Data) {
		const data = await this.getAll();

		data[id] = newData;

		await writeFile(this.location, data);
	}
}
