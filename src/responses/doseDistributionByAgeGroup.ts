export interface DoseDistributionByAgeGroupSqlResult {
  vaccine: string;
  age_group: string;
  dose_order: string;
  sex: string;
  applications: Number;
}

const getSex = (sex: string) => {
  if (sex === 'F') return 'Femenino';
  if (sex === 'M') return 'Masculino';
  return 'Sin identificar';
};

export class DoseDistributionByAgeGroup {
  public vaccine: string;
  public ageGroup: string;
  public doseOrder: string;
  public sex: string;
  public applications: Number;

  constructor(result: DoseDistributionByAgeGroupSqlResult) {
    this.vaccine = result.vaccine;
    this.ageGroup =
      result.age_group !== 'S.I.'
        ? result.age_group + ' años'
        : result.age_group;
    this.doseOrder = 'Dosis nro ' + String(result.dose_order);
    this.sex = getSex(result.sex);
    this.applications = Number(result.applications);
  }
}
