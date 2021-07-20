export class ApplicationVsDistributionResponse {
  public applications_count: Number;
  public distribution_count: Number;

  constructor(result) {
    this.applications_count = result.applications_count;
    this.distribution_count = result.distribution_count;
  }
}
