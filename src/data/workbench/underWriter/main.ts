import { JsonFileStorage } from '../../../util/JsonFileStorage';
import { Underwriter } from './structure';

const underwriterFile = new JsonFileStorage<Underwriter>('./underwriter.json');

export const getAllUnderwritters = async (): Promise<Underwriter[]> => Object.values(await underwriterFile.getAll()).map((e) => new Underwriter(e));

export const getUnderWriter = async (id: string): Promise<Underwriter> => (await getAllUnderwritters()).find((e) => e.id === id);

export const saveUnderWriter = async (underwriter: Underwriter) => {
	await underwriterFile.saveData(underwriter.id, underwriter);
};
