export class Persistance {
    constructor({benAdminID, interviewID, entityType, dependent, interviewStatus, corrections, limra, UME}) {
        this.benAdminID = benAdminID;
        this.interviewID = interviewID;
        this.entityType = entityType;
        this.dependent = dependent.map(d=>new Dependent(d)) ;
        this.interviewStatus = new InterviewStatus(interviewStatus);
        this.corrections = corrections;
        this.limra = new Limra(limra);
        this.UME = UME;
    }
}

class Dependent {

    constructor({dependentEoiID, dependentInterviewID, dependentRelationshipTypeCode, dependentEmail}) {
        this.dependentEoiID = dependentEoiID;
        this.dependentInterviewID = dependentInterviewID;
        this.dependentRelationshipTypeCode = dependentRelationshipTypeCode;
        this.dependentEmail = dependentEmail;
    }
}

class InterviewStatus {

    constructor({eConsent, hipaa, enquiry, corrections, esignature, status, currentStep}) {
        this.eConsent = eConsent;
        this.hipaa = hipaa;
        this.enquiry = enquiry;
        this.corrections = corrections;
        this.esignature = esignature;
        this.status = status;
        this.currentStep = currentStep;
    }
}

class Limra {

    constructor({transmissionGUID, senderName, senderPlatformName, receiverName, creationDateTime, testProductionCode, transmissionTypeCode, schemaVersionIdentifier, employer}) {
        this.transmissionGUID = transmissionGUID;
        this.senderName = senderName;
        this.senderPlatformName = senderPlatformName;
        this.receiverName = receiverName;
        this.creationDateTime = creationDateTime;
        this.testProductionCode = testProductionCode;
        this.transmissionTypeCode = transmissionTypeCode;
        this.schemaVersionIdentifier = schemaVersionIdentifier;
        this.employer = new Employer(employer);
    }
}

class Employer {


    constructor({employerPartyID, carrierMasterAgreementNumber, employerName, employee}) {
        this.employerPartyID = employerPartyID;
        this.carrierMasterAgreementNumber = carrierMasterAgreementNumber;
        this.employerName = employerName;
        this.employee = employee.map(e=>new Employee(e));
    }
}

class Employee {

    constructor({employeePartyID, employeeSocialSecurityNumber, employeeIdentifier, employeeName, employeeGenderCode, employeeBirthDate, employeeHomePhone, employeeWorkPhone, employeeMailingAddress, employeeEmail, employmentInformation, event, employeeEventID, dependent, otherParty, beneficiaryGroup, producer, coverage, employeeForm}) {
        this.employeePartyID = employeePartyID;
        this.employeeSocialSecurityNumber = employeeSocialSecurityNumber;
        this.employeeIdentifier = employeeIdentifier;
        this.employeeName = new Name(employeeName);
        this.employeeGenderCode = employeeGenderCode;
        this.employeeBirthDate = employeeBirthDate;
        this.employeeHomePhone = employeeHomePhone;
        this.employeeWorkPhone = employeeWorkPhone;
        this.employeeMailingAddress = new MailingAddress(employeeMailingAddress);
        this.employeeEmail = employeeEmail;
        this.employmentInformation = employmentInformation;
        this.event = event;
        this.employeeEventID = employeeEventID;
        this.dependent = dependent.map(d=>new Dependent2(d));
        this.otherParty = otherParty;
        this.beneficiaryGroup = beneficiaryGroup;
        this.producer = producer;
        this.coverage = coverage.map(c=>new Coverage(c));
        this.employeeForm = employeeForm;
    }
}

class Name {
    constructor({firstName, lastName}) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class MailingAddress {

    constructor({firstLineAddress, cityName, stateProvinceCode, postalCode, countryCode}) {
        this.firstLineAddress = firstLineAddress;
        this.cityName = cityName;
        this.stateProvinceCode = stateProvinceCode;
        this.postalCode = postalCode;
        this.countryCode = countryCode;
    }
}



class Dependent2 {

    constructor({dependentPartyID, dependentSocialSecurityNumber, dependentName, dependentRelationshipTypeCode, dependentGenderCode, dependentBirthDate, dependentMailingAddress, dependentEventID}) {
        this.dependentPartyID = dependentPartyID;
        this.dependentSocialSecurityNumber = dependentSocialSecurityNumber;
        this.dependentName = new Name(dependentName);
        this.dependentRelationshipTypeCode = dependentRelationshipTypeCode;
        this.dependentGenderCode = dependentGenderCode;
        this.dependentBirthDate = dependentBirthDate;
        this.dependentMailingAddress = new MailingAddress(dependentMailingAddress);
        this.dependentEventID = dependentEventID;
    }
}

class Coverage {
    constructor({coverageID, groupPolicyNumber, productTypeCode, benefitPlanIdentifier, benefitClassIdentifier, originalCoverageEffectiveDate, coverageEffectiveDate, coverageTierCode, benefitAmount, benefitEarningsEffectiveDate, electedCoverage, coverageInsured, coverageEventID}) {
        this.coverageID = coverageID;
        this.groupPolicyNumber = groupPolicyNumber;
        this.productTypeCode = productTypeCode;
        this.benefitPlanIdentifier = benefitPlanIdentifier;
        this.benefitClassIdentifier = benefitClassIdentifier;
        this.originalCoverageEffectiveDate = originalCoverageEffectiveDate;
        this.coverageEffectiveDate = coverageEffectiveDate;
        this.coverageTierCode = coverageTierCode;
        this.benefitAmount = benefitAmount;
        this.benefitEarningsEffectiveDate = benefitEarningsEffectiveDate;
        this.electedCoverage = new ElectedCoverage(electedCoverage) ;
        this.coverageInsured = coverageInsured.map(c=>new CoverageInsured(c));
        this.coverageEventID = coverageEventID;
    }
}

class ElectedCoverage {
    constructor({electedBenefitAmount, electedCoverageInsured, electedCoverageRider}) {
        this.electedBenefitAmount = electedBenefitAmount;
        this.electedCoverageInsured = electedCoverageInsured;
        this.electedCoverageRider = electedCoverageRider;
    }
}

class CoverageInsured {

    constructor({insuredPartyID, primaryInsuredIndicator, insuredCoverageEffectiveDate}) {
        this.insuredPartyID = insuredPartyID;
        this.primaryInsuredIndicator = primaryInsuredIndicator;
        this.insuredCoverageEffectiveDate = insuredCoverageEffectiveDate;
    }
}
