import { JsonFileStorage } from '../../../util/JsonFileStorage';
import { Case } from '../../../data/workbench/case/structure';
import {} from "../underWriter/main"

const caseFileStorage = new JsonFileStorage<Case>('./cases.json');

export const saveCase = async (caseToSave: Case): Promise<void> => {
	await caseFileStorage.saveData(caseToSave.id, caseToSave);
};

export const getAllCase = async (): Promise<Case[]> => {
	const data = Object.values(await caseFileStorage.getAll());
	return data.map((e) => new Case(e));
};

export const getCaseById =async (id:string): Promise<Case> => {
  const cases = await getAllCase();
  return cases.find(e=>e.id === id)
}