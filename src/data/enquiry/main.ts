import { CONSTANTS } from '../../routes/enquiry';
import Enquiry, { Question } from './structure';
import { readFile, writeFile } from '../../util/CommonFunctions';
type enquiry = { [key: string]: string[] };

const getAllEnquiry = async (): Promise<{ [key: string]: enquiry }> => {
	let data = null;

	while (!data) {
		console.log('READING DATA');

		data = await readFile(CONSTANTS.ENQUIRY_FILE);
	}

	return JSON.parse(data);
};

const getEnquiryById = async (id: string): Promise<enquiry> => {
	const enquires = await getAllEnquiry();

	if (enquires && enquires[id]) return enquires[id];

	return {};
};

const saveEnquiry = async (enquiryId: string, enquiry: enquiry) => {
	const enquries = await getAllEnquiry();
	enquries[enquiryId] = enquiry;
	writeFile(CONSTANTS.ENQUIRY_FILE, enquries);
};

type QuesetionJson = {
	section: {
		name: string;
		enquiryLines: {
			_uid: string;
			isSatisfied: boolean;
			path: string;
			name: string;
			questions: {
				_uid: string;
				path: string;
				name: string;
				text: string;
				helpText: string;
				isMultiValued: string;
				optionsListName: string;
				options: {
					_uid: string;
					name: string;
					text: string;
				}[];
			}[];
		}[];
	}[];
};

const getQuestion = async (): Promise<QuesetionJson> => {
	const data = await readFile(CONSTANTS.QUESTION_FILE);
	return JSON.parse(data);
};

const getQuestionArray = async (): Promise<Question[]> => {
	const questionJson = await getQuestion();
	const questionArray = [];
	questionJson.section.forEach((section) => {
		section.enquiryLines.forEach((line) => {
			line.questions.forEach((question) => {
				questionArray.push(new Question(question, null));
			});
		});
	});
	return questionArray;
};

const getQuestionByName = async (questionName: string): Promise<Question | null> => {
	const questions = await getQuestionArray();

	return questions.find((e) => e.name === questionName);
};

/**
 * Function to create a new enquiry id
 * @returns New generate id
 */
export const newEnquiry = async (uid = null): Promise<string> => {
	if (uid === null) {
		// Generate new enquiry id
		const date = new Date();
		uid = date.getTime().toString();
	}

	// Save enquiry id in response
	saveEnquiry(uid, {});

	return uid;
};

/**
 * Function to convert a vaild enquiry id into reponse
 * @param enquiryId Need a valid enquiry id
 * @returns Will return the question and user response in mixed formate from UME and Rahul Responses
 */
export const getResponse = async (enquiryId: string): Promise<Enquiry> => {
	const enquiryJSON = await getEnquiryById(enquiryId);
	const questionsJSON = await getQuestion();
	return new Enquiry(enquiryId, questionsJSON, enquiryJSON);
};

/**
 * Function to store the user input based on enquiry id and question name
 * @param enquiryId A valid enquiry id
 * @param questionName A valid question name
 * @param userResponse a valid user response
 */
export const saveResponse = async (enquiryId: string, questionName: string, userResponse: string[]): Promise<boolean> => {
	const enquiry = await getEnquiryById(enquiryId);
	enquiry[questionName] = userResponse;
	await saveEnquiry(enquiryId, enquiry);
	return true;
};
