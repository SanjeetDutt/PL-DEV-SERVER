import { CONSTANTS } from '../../routes/enquiry';
import validation from './validation';

const get = <T>(json: {}, key: string, defaultValue: T): T => {
	if (json && json[key]) return json[key];

	return defaultValue;
};

export default class Enquiry {
	enquiryId: string;
	branch: string = CONSTANTS.BRANCH;
	tag: string = CONSTANTS.TAG;
	locale: string = 'EN_US';
	availableLocale: string[] = ['EN_US'];
	effectiveDate: number = 1689033600000;
	isVoid: boolean = false;
	isSatisfied: boolean = false;
	isClosable: boolean = false; // Still unclear
	isOpen: boolean = true; // Still unclear
	buckets: any[] = []; // Still unclear
	section: Section[];
	allAnswer: {};
	debugInfo: {} = {};

	constructor(enquiryId: string, questionJson: {}, responseJson: {}) {
		this.enquiryId = enquiryId;
		this.section = get<[]>(questionJson, 'sections', []).map((section) => new Section(section, responseJson));
		this.allAnswer = responseJson;
		this.isSatisfied = this.section.filter((section) => !section.isSatisfied).length === 0;
	}
}

export class Section {
	name: string;
	isSatisfied: boolean;
	hasQuestion: boolean;
	enquiryLines: EnquiryLine[];

	constructor(sectionJson: {}, responseJson: {}) {
		this.name = get<string>(sectionJson, 'name', '');
		this.enquiryLines = get<[]>(sectionJson, 'enquiryLines', []).map((enquiryLine) => new EnquiryLine(enquiryLine, responseJson));
		this.hasQuestion = this.enquiryLines.filter((line) => line.questions.length > 0).length > 0;
		this.isSatisfied = this.enquiryLines.filter((line) => !line.isSatisfied).length === 0;
	}
}

export class EnquiryLine {
	_uid: string;
	isSatisfied: boolean;
	path: string;
	name: string;
	questions: Question[];

	constructor(enquiryLineJson: {}, responseJson: {}) {
		this._uid = get<string>(enquiryLineJson, '_uid', '');
		this.name = get<string>(enquiryLineJson, 'name', '');
		this.questions = get<[]>(enquiryLineJson, 'questions', []).map((question) => new Question(question, responseJson));
		this.path = get<string>(enquiryLineJson, 'path', '');
		this.isSatisfied = this.questions.filter((question) => !question.isSatisfied).length === 0;
	}
}

export class Question {
	_uid: string;
	isSatisfied: boolean = false;
	path: string = '';
	name: string;
	text: string;
	helpText: string;
	isMultiValued: boolean;
	answer: string[] = [];
	optionListName: string;
	options: EnquiryOption[];
	tags: string[];
	errorMsg: string;
	type: string = 'text';

	constructor(questionJson: {}, responseJson: {}) {
		this._uid = get<string>(questionJson, '_uid', '');
		this.name = get<string>(questionJson, 'name', '');
		this.text = get<string>(questionJson, 'text', '');
		this.helpText = get<string>(questionJson, 'helpText', '');
		this.isMultiValued = get<boolean>(questionJson, 'isMultiValued', false);
		this.options = get<[]>(questionJson, 'options', []).map((option) => new EnquiryOption(option));
		this.tags = get<string[]>(questionJson, 'tags', []);
		this.optionListName = get<string>(questionJson, 'optionsListName', '');

		//Setting and validating the answer
		if (responseJson[this.name]) {
			this.answer = responseJson[this.name];
			if (validation[this.name]) {
				const validate: string | boolean = validation[this.name](this.answer);

				if (validate === true) {
					this.isSatisfied = true;
				} else {
					this.isSatisfied = false;
					this.errorMsg = validate as string;
				}
			} else {
				this.isSatisfied = true;
			}
		}
	}
}

export class EnquiryOption {
	_uid: string;
	name: string;
	text: string;

	constructor(optionJson: {}) {
		this._uid = get<string>(optionJson, '_uid', '');
		this.name = get<string>(optionJson, 'name', '');
		this.text = get<string>(optionJson, 'text', '');
	}
}
