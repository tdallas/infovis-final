import { IDatabase } from 'pg-promise';
import { DailyApplicationsSqlResult } from '../responses/dailyApplications';
import { DoseDistributionByAgeGroupSqlResult } from '../responses/doseDistributionByAgeGroup';

export interface VaccineTypeDistributionByProvince {}

export interface ApplicationConditionsByAgeGroup {}

export interface VaccineApplicationsRepository {
  getDoseDistributionByAgeGroup(): Promise<
    Array<DoseDistributionByAgeGroupSqlResult>
  >;

  getVaccineTypeDistribution(
    province: string | undefined
  ): Promise<Array<VaccineTypeDistributionByProvince>>;

  getTotalVaccinesApplicated(province: string | undefined): Promise<Number>;

  getApplicationConditionsByAgeGroup(
    province: string | undefined,
    age_group: string | undefined
  ): Promise<Array<ApplicationConditionsByAgeGroup>>;

  getDailyApplications(): Promise<Array<DailyApplicationsSqlResult>>;

  getApplicationsByAgeGroup(): Promise<Array<any>>;
}

const configure = (db: IDatabase<any>): VaccineApplicationsRepository => ({
  async getDoseDistributionByAgeGroup() {
    return db.many('SELECT * FROM vaccines_applications_by_dose_and_age');
  },
  async getVaccineTypeDistribution(province: string | undefined) {
    return db.many(
      `SELECT vaccine, COUNT(*) FROM applications_by_place ` +
        (province ? `WHERE application_jurisdiction = ${province}` : '') +
        `GROUP BY application_jurisdiction`
    );
  },
  async getTotalVaccinesApplicated(province: string | undefined) {
    return db.one(
      `SELECT COUNT(*) FROM applications_by_place ` +
        (province ? `WHERE application_jurisdiction = ${province}` : '')
    );
  },
  async getApplicationConditionsByAgeGroup(
    province: string | undefined,
    age_group: string | undefined
  ) {
    return db.many(
      `SELECT application_condition, age_group, COUNT(*) FROM applications_by_place ` +
        (province ? `WHERE application_jurisdiction = ${province}` : '') +
        (province ? `AND age_group = ${age_group}` : '')
    );
  },
  async getDailyApplications() {
    return db.many('SELECT * FROM daily_applications_by_vaccine');
  },
  async getApplicationsByAgeGroup() {
    return db.many(
      'SELECT sex, COUNT(*) FROM vaccines_by_dose_and_age GROUP BY sex'
    );
  },
});

export default configure;
