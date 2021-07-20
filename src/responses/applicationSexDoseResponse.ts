export interface ApplicationSexDoseSqlResult {
  vaccine: string;
  dose: Number;
  sex: string;
  count: Number;
  province: string;
  city: string;
}

export class ApplicationSexDoseResponse {
  public vaccine: string;
  public dose: Number;
  public sex: string;
  public count: Number;
  public province: string;
  public city: string;

  constructor(result: ApplicationSexDoseSqlResult) {
    this.vaccine = result.vaccine;
    this.dose = result.dose;
    this.sex = result.sex;
    this.count = result.count;
    this.province = result.province;
    this.city = result.city;
  }
}
