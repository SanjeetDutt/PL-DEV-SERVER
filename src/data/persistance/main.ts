import { readFile, writeFile } from '../../util/CommonFunctions';
import { Persistance } from './structure';
import { CONSTANTS } from '../../routes/persistance';

const getAllPersistance = async (): Promise<{ [key: string]: Persistance }> => {
	let data = null;

	while (!data) {
		data = await readFile(CONSTANTS.PERSISTANCE_FILE);
	}

	return JSON.parse(data);
};

const getPersistanceById = async (id: string): Promise<Persistance | null> => {
	const persistances = await getAllPersistance();

	if (persistances && persistances[id]) return persistances[id];

	return null;
};

const savePersistance = async (interviewId: string, persistance: Persistance) => {
	const persistances = await getAllPersistance();
	persistances[interviewId] = persistance;
	await writeFile(CONSTANTS.PERSISTANCE_FILE, persistances);
};

export const createNewInterviewId = (): string => {
	const generateHash = () => {
		return Math.random().toString(36).slice(2);
	};

	return `${generateHash()}-${generateHash()}-${generateHash()}-${generateHash()}-${generateHash()}`;
};

// function to create the persistance class and add it to persistance store
export const createPersistance = async (interviewID: string) => {
	const newPersistance = new Persistance(interviewID);
	await savePersistance(interviewID, newPersistance);
};

export const fetchPersistance =async (interviewID:string) => {
  return await getPersistanceById(interviewID)
}