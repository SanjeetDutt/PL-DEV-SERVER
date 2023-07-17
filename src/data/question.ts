// import NotFoundError from '../util/errors';

// import fs from 'node:fs/promises';

// async function readData(fileName: string) {
// 	const data = await fs.readFile(fileName, 'utf8');
// 	return JSON.parse(data);
// }

// async function writeData(fileName: string, data: object) {
// 	await fs.writeFile(fileName, JSON.stringify(data));
// }

// async function readResponse() {
// 	return await readData('response.json');
// }

// async function writeResponse(data) {
// 	await fs.writeFile('response.json', JSON.stringify(data));
// }

// function findResponse(responses, id) {
// 	return responses.find((r) => r.id === id);
// }

// async function readQuestion() {
// 	return await readData('question.json');
// }

// async function writeQuestion(data) {
// 	await fs.writeFile('question.json', JSON.stringify(data));
// }

// function findQuestion(questions, id) {
// 	return questions.find((q) => q.id === id);
// }

// function generateQuestionResponse(question) {
// 	if (question === null) return null;

// 	const response = {};

// 	response.id = question.id;
// 	response.title = question.title;
// 	response.description = question.description;
// 	response.type = question.type;

// 	if (question.options) {
// 		response.option = question.options;
// 	}

// 	return response;
// }

// function generateUserResponse(question, response) {
// 	if (question === null) return null;

// 	const userResponse = { ...generateQuestionResponse(question) };

// 	userResponse.response = response.answer;

// 	return userResponse;
// }

// function validateResponse(question, response) {
// 	if (!question.check) return true;

// 	if (question.check === 'yesNoCheck') return response.answer === 'Yes';

// 	return false;
// }

// async function getAll() {
// 	const { responses } = await readResponse();
// 	const { questions } = await readQuestion();

// 	const userResponse = [];
// 	let nextQuestionToAsk = null;

// 	let questionId = '1';

// 	while (questionId !== '') {
// 		const question = findQuestion(questions, questionId);

// 		if (!question) throw new NotFoundError('Question not found.');

// 		const response = findResponse(responses, questionId);

// 		console.log(questionId, question, response);

// 		if (!response) {
// 			// User didnt give any response
// 			questionId = '';
// 			nextQuestionToAsk = question;
// 		} else {
// 			// question has a response
// 			userResponse.push(generateUserResponse(question, response));
// 			if (validateResponse(question, response)) {
// 				questionId = question.onTrue;
// 			} else {
// 				questionId = question.onFalse;
// 			}
// 		}
// 	}

// 	return {
// 		userResponse,
// 		nextQuestion: generateQuestionResponse(nextQuestionToAsk)
// 	};
// }

// async function add(questionId, response) {
// 	const { questions } = await readQuestion();
// 	const { responses } = await readResponse();

// 	const newResponse = [];

// 	let qId = '1';

// 	while (qId !== '') {
// 		const question = findQuestion(questions, qId);

// 		if (qId === questionId) {
// 			newResponse.push({
// 				id: qId,
// 				answer: response
// 			});
// 			qId = '';
// 		} else {
// 			const previousResponse = findResponse(responses, qId);

// 			if (previousResponse) {
// 				const res = {
// 					id: qId,
// 					answer: previousResponse.answer
// 				};
// 				newResponse.push(res);

// 				if (validateResponse(question, res)) {
// 					qId = question.onTrue;
// 				} else {
// 					qId = question.onFalse;
// 				}
// 			} else {
// 				throw new NotFoundError('Response not found');
// 			}
// 		}
// 	}
// 	await writeResponse({ responses: newResponse });
// 	console.log('ANSWER UPDATED');
// }

// export default {
// 	getAll,
// 	add
// };
