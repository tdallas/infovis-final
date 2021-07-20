export interface ApplicationConditionsSqlResult {
  application_condition: string;
  sex: string;
  count: Number;
  province: string;
  city: string;
  age_group: string;
}

export class ApplicationConditionsResponse {
  public application_condition: string;
  public sex: string;
  public count: Number;
  public province: string;
  public city: string;
  public age_group: string;

  constructor(result: ApplicationConditionsSqlResult) {
    this.application_condition = result.application_condition;
    this.sex = result.sex;
    this.count = result.count;
    this.province = result.province;
    this.city = result.city;
    this.age_group = result.age_group;
  }
}
