export interface DailyApplicationsSqlResult {
  vaccine: string;
  application_date: Date;
  count: Number;
}

const moment = require('moment');

export class DailyApplications {
  public vaccine: string;
  public applicationDate: Date;
  public applications: Number;

  constructor(result: DailyApplicationsSqlResult) {
    this.vaccine = result.vaccine;
    this.applicationDate = result.application_date;
    this.applications = Number(result.count);
  }
}
