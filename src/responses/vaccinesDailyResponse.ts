export class VaccinesDailyResponse {
  public vaccine: string;
  public dose: Number;
  public sex: string;
  public count: Number;
  public province: string;
  public city: string;
  public application_date: Date;

  constructor(result) {
    this.vaccine = result.vaccine;
    this.dose = result.dose;
    this.sex = result.sex;
    this.count = result.count;
    this.province = result.province;
    this.city = result.city;
    this.application_date = result.date;
  }
}
