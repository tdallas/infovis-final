export interface VaccinesDetailCountSqlResult {
  vaccine: string;
  age_group: string;
  dose: string;
  sex: string;
  count: Number;
  city: string;
  province: string;
}

const getSex = (sex: string) => {
  if (sex === 'F') return 'Femenino';
  if (sex === 'M') return 'Masculino';
  return 'Sin identificar';
};

export class VaccinesDetailCountResponse {
  public vaccine: string;
  public ageGroup: string;
  public dose: string;
  public sex: string;
  public count: Number;
  public city: string;
  public province: string;

  constructor(result: VaccinesDetailCountSqlResult) {
    this.vaccine = result.vaccine;
    this.ageGroup =
      result.age_group !== 'S.I.'
        ? result.age_group + ' años'
        : result.age_group;
    this.dose = 'Dosis nro ' + String(result.dose);
    this.sex = getSex(result.sex);
    this.count = Number(result.count);
    this.city = result.city;
    this.province = result.province;
  }
}
