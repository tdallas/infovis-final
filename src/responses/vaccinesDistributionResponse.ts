export interface VaccinesDistributionSqlResult {
  vaccine: string;
  dose: Number;
  count: Number;
}

export class VaccinesDistributionResponse {
  public vaccine: string;
  public dose: Number;
  public count: Number;

  constructor(result: VaccinesDistributionSqlResult) {
    this.vaccine = result.vaccine;
    this.dose = result.dose;
    this.count = result.count;
  }
}
