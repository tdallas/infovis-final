export interface DoseDistributionByAgeGroupSqlResult {
  vaccine: string;
  age_group: string;
  dose_order: string;
  sex: string;
  count: Number;
}

export class DoseDistributionByAgeGroup {
  public vaccine: string;
  public ageGroup: string;
  public doseOrder: string;
  public sex: string;
  public applications: Number;

  constructor(result: DoseDistributionByAgeGroupSqlResult) {
    this.vaccine = result.vaccine;
    this.ageGroup = result.age_group + ' años';
    this.doseOrder = 'Dosis nro ' + String(result.dose_order);
    this.sex = result.sex;
    this.applications = Number(result.count);
  }
}
