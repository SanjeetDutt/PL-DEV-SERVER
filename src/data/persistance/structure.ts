import Enquiry from '../enquiry/structure';

export class Persistance {
	benAdminID: string = '1'; // might be eoiID
	interviewID: string;
	entityType: "Employee" | "Spouse" = 'Employee';
	dependent: Dependent[] = [new Dependent()];
	interviewStatus: InterviewStatus = new InterviewStatus();
	corrections: {
		email?: string;
	} = {};
	limra: Limra = new Limra();
	UME: Enquiry;

	constructor(interviewId: string) {
		this.interviewID = interviewId;
		this.UME = new Enquiry(interviewId, {}, {});
	}
}

export class Dependent {
	dependentEoiID: string = '';
	dependentInterviewID: string = '';
	dependentRelationshipTypeCode: string = ''; //["Child", "Grandchild", "Partner", "Spouse", "Other"]
	dependentEmail: string = '';
}

export class InterviewStatus {
	eConsent: boolean = false;
	hipaa: boolean = false;
  enquiry: boolean = false;
	corrections: boolean = false;
	esignature: boolean = false;
	status: 'active' | 'approved' | 'declined' | 'pending' = 'active';
	currentStep: '' | 'eConsent' | 'hipaa' | 'corrections' | 'enquiry' | 'esignature' = '';
}

export class Limra {
	transmissionGUID: string = '';
	senderName: string = '';
	senderPlatformName: string = '';
	receiverName: string = '';
	creationDateTime: string = '';
	testProductionCode: string = '';
	transmissionTypeCode: string = '';
	schemaVersionIdentifier: string = '';
	employer: Employer[] = [new Employer()];
}

export class Employer {
	employerPartyID: string = '';
	carrierMasterAgreementNumber: CarrierMasterAgreementNumber[];
	employerName: string = '';
	employee: Employee[] = [new Employee()];
}

export class CarrierMasterAgreementNumber {
	masterAgreementNumber: string = '';
}

export class Employee {
	employeePartyID: string = '';
	employeeSocialSecurityNumber: string = '';
	employeeIdentifier: string = '';
	employeeName: EmployeeName = new EmployeeName();
	employeeGenderCode: 'Female' | 'Male' | 'NonBinary' | 'NotSpecified' | '' = '';
	employeeBirthDate: string = '';
	employeeHomePhone: string = '';
	employeeWorkPhone: string = '';
	employeeMailingAddress: EmployeeMailingAddress = new EmployeeMailingAddress();
	employeeEmail: string = '';
	employmentInformation: EmploymentInformation = new EmploymentInformation();
	event: Event[] = [new Event()];
	employeeEventID: any[] = [];
	dependent: Dependent2[] = [new Dependent2()];
	otherParty: any[] = [];
	beneficiaryGroup: any[] = [];
	producer: any[] = [];
	coverage: Coverage[] = [new Coverage()];
	employeeForm: any[] = [];
}

export class EmployeeName {
	firstName: string = '';
	lastName: string = '';
}

export class EmployeeMailingAddress {
	firstLineAddress: string = '';
	cityName: string = '';
	stateProvinceCode: string = '';
	postalCode: string = '';
	countryCode: string = '';
}

export class EmploymentInformation {
	originalHireDate: string = '';
	employmentTypeCode: string = '';
	employmentStatusCode: string = '';
	employmentIncome: EmploymentIncome[] = [new EmploymentIncome()];
	employmentInformationUserDefinedCategory: any[] = [];
}

export class EmploymentIncome {
	incomeTypeCode: string = '';
	incomeAmount: number;
	incomeModeCode: string = '';
	incomeEffectiveDate: string = '';
}

export class Event {
	eventID: string = '';
	eventTypeCode: string = '';
	eventTypeReasonCode: string = '';
	eventDate: string = '';
	enrollmentInformationID: any[] = [];
}

export class Dependent2 {
	dependentPartyID: string = '';
	dependentSocialSecurityNumber: string = '';
	dependentName: DependentName = new DependentName();
	dependentRelationshipTypeCode: string = '';
	dependentGenderCode: string = '';
	dependentBirthDate: string = '';
	dependentMailingAddress: DependentMailingAddress = new DependentMailingAddress();
	dependentEventID: any[] = [];
}

export class DependentName {
	firstName: string = '';
	lastName: string = '';
}

export class DependentMailingAddress {
	firstLineAddress: string = '';
	cityName: string = '';
	stateProvinceCode: string = '';
	postalCode: string = '';
	countryCode: string = '';
}

export class Coverage {
	coverageID: string = '';
	groupPolicyNumber: string = '';
	productTypeCode: string = '';
	benefitPlanIdentifier: string = '';
	benefitClassIdentifier: string = '';
	originalCoverageEffectiveDate: string = '';
	coverageEffectiveDate: string = '';
	coverageTierCode: string = '';
	benefitAmount: number;
	benefitEarningsEffectiveDate: string = '';
	electedCoverage: ElectedCoverage = new ElectedCoverage();
	coverageInsured: CoverageInsured[] = [new CoverageInsured()];
	coverageEventID: any[] = [];
}

export class ElectedCoverage {
	electedBenefitAmount: number = 0;
	electedCoverageInsured: CoverageInsured[] = [new CoverageInsured()];
	electedCoverageRider: any[] = [];
}

export class CoverageInsured {
	insuredPartyID: string = '';
	primaryInsuredIndicator: boolean = false;
	insuredCoverageEffectiveDate: string = '';
}
