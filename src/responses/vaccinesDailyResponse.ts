export interface VaccinesDailySqlResult {}

export class VaccinesDailyResponse {
  public vaccine: string;
  public dose: Number;
  public sex: string;
  public count: Number;
  public province: string;
  public city: string;
  public date: Date;

  constructor(result: any) {
    this.vaccine = result.vaccine;
    this.dose = result.dose;
    this.sex = result.sex;
    this.count = result.count;
    this.province = result.province;
    this.city = result.city;
    this.date = result.date;
  }
}
