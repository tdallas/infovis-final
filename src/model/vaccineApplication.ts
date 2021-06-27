export class VaccineApplication {
  public sex: string;
  public ageGroup: string; // format: min-max
  public residenceJurisdiction: string;
  public residenceJurisdictionId: Number;
  public residenceDepartment: string;
  public residenceDepartmentId: Number;
  public applicationJurisdiction: string;
  public applicationJurisdictionId: Number;
  public applicationDepartment: string;
  public applicationDepartmentId: Number;
  public applicationDate: Date;
  public vaccine: string;
  public applicationCondition: string;
  public doseOrder: Number; // 1 or 2
  public vaccineLot: string;

  constructor(
    sex: string,
    ageGroup: string,
    residenceJurisdiction: string,
    residenceJurisdictionId: Number,
    residenceDepartment: string,
    residenceDepartmentId: Number,
    applicationJurisdiction: string,
    applicationJurisdictionId: Number,
    applicationDepartment: string,
    applicationDepartmentId: Number,
    applicationDate: Date,
    vaccine: string,
    applicationCondition: string,
    doseOrder: Number,
    vaccineLot: string
  ) {
    this.sex = sex;
    this.ageGroup = ageGroup;
    this.residenceJurisdiction = residenceJurisdiction;
    this.residenceJurisdictionId = residenceJurisdictionId;
    this.residenceDepartment = residenceDepartment;
    this.residenceDepartmentId = residenceDepartmentId;
    this.applicationJurisdiction = applicationJurisdiction;
    this.applicationJurisdictionId = applicationJurisdictionId;
    this.applicationDepartment = applicationDepartment;
    this.applicationDepartmentId = applicationDepartmentId;
    this.applicationDate = applicationDate;
    this.vaccine = vaccine;
    this.applicationCondition = applicationCondition;
    this.doseOrder = doseOrder;
    this.vaccineLot = vaccineLot;
  }
}
