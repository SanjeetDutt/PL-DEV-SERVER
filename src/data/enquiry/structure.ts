import { CONSTANTS } from '../../routes/enquiry';
import validation from './validation';

const get = <T>(json: {}, key: string, defaultValue: T): T => {
	if (json && json[key]) return json[key];

	return defaultValue;
};

export default class Enquiry {
	enquiryId: string;
	branch: string;
	tag: string;
	locale: string = 'EN_US';
	availableLocale: string[] = ['EN_US'];
	effectiveDate: number = 1689033600000;
	isVoid: boolean = false;
	isSatisfied: boolean = false;
	isClosable: boolean = false; // Still unclear
	isOpen: boolean = true; // Still unclear
	buckets: any[] = []; // Still unclear
	sections: Section[];
	allAnswer: {};
	debugInfo: {} = {};

	constructor(enquiryId: string, questionJson: {}, responseJson: {}) {
		this.enquiryId = enquiryId;

		//populating from question.json
		this.branch = get<string>(questionJson, 'branch', CONSTANTS.BRANCH);
		this.tag = get<string>(questionJson, 'tag', CONSTANTS.TAG);
		this.locale = get<string>(questionJson, 'locale', 'EN_US');
		this.availableLocale = get<string[]>(questionJson, 'availableLocale', ['EN_US']);
		this.effectiveDate = get<number>(questionJson, 'effectiveDate', 1689033600000);
		this.isVoid = get<boolean>(questionJson, 'isVoid', false);
		this.isClosable = get<boolean>(questionJson, 'isClosable', false);
		this.isOpen = get<boolean>(questionJson, 'isOpen', true);
		this.buckets = get<any>(questionJson, 'buckets', []);

		this.sections = get<[]>(questionJson, 'sections', []).map((section) => new Section(section, responseJson));
		this.allAnswer = responseJson;
		this.isSatisfied = this.sections.filter((section) => !section.isSatisfied).length === 0;
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
	isSatisfied: boolean;
	path: string;
	name: string;
	questions: Question[];

	alias: string;
	section: string;
	preamble: string;
	rawSection: string;
	rawPreamble: string;
	hasQuestions: boolean;
	isWrapUpLine: boolean;
	isGlobal: boolean;
	isRoot: boolean;
	isForced: boolean;
	tags: string[];
	triggers: string[];
	triggerQuestions: {};
	bucket: [];
	staticallyTriggeredLines: [];

	constructor(enquiryLineJson: {}, responseJson: {}) {
		this.name = get<string>(enquiryLineJson, 'name', '');
		this.path = get<string>(enquiryLineJson, 'path', '');

		this.alias = get<string>(enquiryLineJson, 'alias', '');
		this.section = get<string>(enquiryLineJson, 'section', '');
		this.preamble = get<string>(enquiryLineJson, 'preamble', '');
		this.rawSection = get<string>(enquiryLineJson, 'rawSection', '');
		this.rawPreamble = get<string>(enquiryLineJson, 'rawPreamble', '');
		this.hasQuestions = get<boolean>(enquiryLineJson, 'hasQuestions', false);
		this.isWrapUpLine = get<boolean>(enquiryLineJson, 'isWrapUpLine', false);
		this.isGlobal = get<boolean>(enquiryLineJson, 'isGlobal', false);
		this.isRoot = get<boolean>(enquiryLineJson, 'isRoot', false);
		this.isForced = get<boolean>(enquiryLineJson, 'isForced', false);
		this.tags = get<string[]>(enquiryLineJson, 'tags', []);
		this.triggers = get<string[]>(enquiryLineJson, 'triggers', []);
		this.triggerQuestions = get<string>(enquiryLineJson, 'triggerQuestions', '');
		this.bucket = get<[]>(enquiryLineJson, 'bucket', []);
		this.staticallyTriggeredLines = get<[]>(enquiryLineJson, 'staticallyTriggeredLines', []);

		this.questions = get<[]>(enquiryLineJson, 'questions', []).map((question) => new Question(question, responseJson));
		this.isSatisfied = this.questions.filter((question) => !question.isSatisfied).length === 0;
	}
}

export class Question {
  name: string;
  path: string;
  locale:string;
  hasAnswer: boolean;
	isSatisfied: boolean = false;
  triggeredLines: string[];
	answer: string[] = [];
	validationErrors:{};
  definition: {};

	constructor(questionJson: {}, responseJson: {}) {
		this.name = get<string>(questionJson, 'name', '');
		this.path = get<string>(questionJson, 'path', '');
		this.locale = get<string>(questionJson, 'locale', '');
		this.hasAnswer = !!responseJson[this.name];
    this.triggeredLines = get<string[]>(questionJson, 'triggeredLines', []); 
    this.definition = get<{}>(questionJson, 'definition', []); 

		//Setting and validating the answer
		if (responseJson[this.name]) {
			this.answer = responseJson[this.name];
			if (validation[this.name]) {
				const validate: string | boolean = validation[this.name](this.answer);

				if (validate === true) {
					this.isSatisfied = true;
				} else {
					this.isSatisfied = false;
					this.validationErrors = validate as string;
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
