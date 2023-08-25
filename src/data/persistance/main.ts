import { readFile, writeFile } from '../../util/CommonFunctions';
import { Dependent, Persistance } from './structure';
import { CONSTANTS } from '../../routes/persistance';

const getAllPersistance = async (): Promise<{ [key: string]: Persistance }> => {
	let data = null;

	while (!data) {
		data = await readFile(CONSTANTS.PERSISTANCE_FILE);
	}

	return JSON.parse(data);
};

const getPersistanceById = async (id: string): Promise<Persistance | null> => {
	const persistance = await getAllPersistance();

	if (persistance && persistance[id]) return persistance[id];

	return null;
};

export const savePersistance = async (interviewId: string, persistance: Persistance) => {
	const persistencies = await getAllPersistance();
	persistencies[interviewId] = persistance;
	await writeFile(CONSTANTS.PERSISTANCE_FILE, persistencies);
};

export const createNewInterviewId = (): string => {
	const generateHash = () => {
		return Math.random().toString(36).slice(2);
	};

	return `${generateHash()}-${generateHash()}-${generateHash()}-${generateHash()}-${generateHash()}`;
};

// function to create the persistance class and add it to persistance store
export const createPersistance = async (interviewID: string): Promise<Persistance> => {
	const newPersistance = new Persistance(interviewID);
	await savePersistance(interviewID, newPersistance);
	return newPersistance;
};

export const fetchPersistance = async (interviewID: string) => {
	return await getPersistanceById(interviewID);
};

const updateEmail = async (interviewID: string, email: string): Promise<Persistance | null> => {
	// get the persistance schema
	const persistance = await getPersistanceById(interviewID);
	// update the employee's email
	if (persistance.limra.employer[0].employee[0].employeeEmail !== email) {
		persistance.corrections.email = email;
	} else {
		delete persistance.corrections.email;
	}

	await savePersistance(interviewID, persistance);

	return persistance;
};

const updateSpouseEmail = async (interviewID: string, email: string): Promise<Persistance | null> => {
	// get the persistance schema
	const persistance = await getPersistanceById(interviewID);

	if (persistance.dependent.length === 0) {
		persistance.dependent.push(new Dependent());
	}

	// update the spouse's email
	persistance.dependent[0].dependentEmail = email;

	await savePersistance(interviewID, persistance);

	// update status
	return persistance;
};

// Keys should follow the sequence of steps and in upper case
export const PROGRESS_NAMES = {
	ECONSENT: 'eConsent', // when user give e-concent to the disclosure
	HIPAA: 'hipaa', // when user give e-concent to HIPPA
	CORRECTIONS: 'corrections', // when user give consent to email
	ENQUIRY: 'enquiry', // questions
	ESIGNATURE: 'esignature' // e signature at last page
};

// This function will update the completed step bool to true and put next step in the current step
const updateProgressTo = async (interviewID: string, stepCompleted: string): Promise<Persistance | null> => {
	const persistance = await getPersistanceById(interviewID);
	// update the step and return the updated schema
	switch (stepCompleted) {
		case PROGRESS_NAMES.ECONSENT:
			persistance.interviewStatus.eConsent = true;

			if (persistance.interviewStatus.eConsent && persistance.interviewStatus.hipaa) {
				persistance.interviewStatus.currentStep = 'corrections';
			} else {
				persistance.interviewStatus.currentStep = 'hipaa';
			}

			break;

		case PROGRESS_NAMES.HIPAA:
			persistance.interviewStatus.hipaa = true;
			if (persistance.interviewStatus.eConsent && persistance.interviewStatus.hipaa) {
				persistance.interviewStatus.currentStep = 'corrections';
			} else {
				persistance.interviewStatus.currentStep = 'hipaa';
			}
			break;

		case PROGRESS_NAMES.CORRECTIONS:
			persistance.interviewStatus.corrections = true;
			persistance.interviewStatus.currentStep = 'enquiry';
			break;

		case PROGRESS_NAMES.ENQUIRY:
			persistance.interviewStatus.enquiry = true;
			persistance.interviewStatus.currentStep = 'esignature';
			break;

		case PROGRESS_NAMES.ESIGNATURE:
			persistance.interviewStatus.status = 'pending';
			persistance.interviewStatus.currentStep = '';
			break;

		default:
			console.error('INVALID PROCESS NAME'); // THIS WILL NEVER HAPPEN
	}

	// persistance.interviewStatus.currentStep = processName;
	await savePersistance(interviewID, persistance);

	return persistance;
};

const completeEsign = async (interviewId: string): Promise<Persistance | null> => {
	const persistance = await getPersistanceById(interviewId);

	persistance.interviewStatus.esignature = true;
	await savePersistance(interviewId, persistance);

	return persistance;
};

export const persistanceUpdates = {
	updateEmail,
	updateSpouseEmail,
	updateProgressTo,
	completeEsign
};
