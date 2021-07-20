export interface ApplicationVsDistributionSqlResult {
  applications_count: Number;
  dosis_received: Number;
}

export class ApplicationVsDistributionResponse {
  public applications_count: Number;
  public dosis_received: Number;

  constructor(result: ApplicationVsDistributionSqlResult) {
    this.applications_count = result.applications_count;
    this.dosis_received = result.dosis_received;
  }
}
