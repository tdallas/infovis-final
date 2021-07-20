export interface VaccinesDetailByVaccineAndDoseSqlResult {
  vaccine: string;
  dose: Number;
  count: Number;
}

export class VaccinesDetailByVaccineAndDoseResponse {
  public vaccine: string;
  public dose: Number;
  public count: Number;

  constructor(result: VaccinesDetailByVaccineAndDoseSqlResult) {
    this.vaccine = result.vaccine;
    this.dose = result.dose;
    this.count = result.count;
  }
}
