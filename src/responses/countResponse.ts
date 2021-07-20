export interface CountResultSql {
  totalapplications: Number;
}
export class CountResponse {
  public count: Number;

  constructor(result: CountResultSql) {
    this.count = result.totalapplications;
  }
}
