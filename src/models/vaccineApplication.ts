export class VaccineApplication {
  public id: Number;
  public sex: string;
  public age_group: string; // format: min-max
  public residence_jurisdiction: string;
  public residence_jurisdiction_id: Number;
  public residence_department: string;
  public residence_department_id: Number;
  public application_jurisdiction: string;
  public application_jurisdiction_id: Number;
  public application_department: string;
  public application_department_id: Number;
  public application_date: Date | null;
  public vaccine: string;
  public application_condition: string;
  public dose_order: Number; // 1 or 2
  public vaccine_lot: string;

  constructor(
    id: Number,
    sex: string,
    age_group: string,
    residence_jurisdiction: string,
    residence_jurisdiction_id: Number,
    residence_department: string,
    residence_department_id: Number,
    application_jurisdiction: string,
    application_jurisdiction_id: Number,
    application_department: string,
    application_department_id: Number,
    application_date: Date,
    vaccine: string,
    application_condition: string,
    dose_order: Number,
    vaccine_lot: string
  ) {
    this.id = id;
    this.sex = sex;
    this.age_group = age_group;
    this.residence_jurisdiction = residence_jurisdiction;
    this.residence_jurisdiction_id = residence_jurisdiction_id;
    this.residence_department = residence_department;
    this.residence_department_id = residence_department_id;
    this.application_jurisdiction = application_jurisdiction;
    this.application_jurisdiction_id = application_jurisdiction_id;
    this.application_department = application_department;
    this.application_department_id = application_department_id;
    this.application_date =
      new Date(application_date).getTime() > 0 ? application_date : null;
    this.vaccine =
      vaccine.toUpperCase() === 'COVISHIELD' ? 'AstraZeneca' : vaccine;
    this.application_condition = application_condition;
    this.dose_order = dose_order;
    this.vaccine_lot = vaccine_lot;
  }
}
