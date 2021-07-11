import { IDatabase } from 'pg-promise';
import { DailyApplicationsSqlResult } from '../responses/dailyApplications';
import { DoseDistributionByAgeGroupSqlResult } from '../responses/doseDistributionByAgeGroup';
import { Location } from '../services/vaccineApplicationsService';

export interface VaccineTypeDistributionByProvince {}

export interface ApplicationConditionsByAgeGroup {}

export interface VaccineApplicationsRepository {
  getDoseDistributionByAgeGroup(
    location: Location
  ): Promise<Array<DoseDistributionByAgeGroupSqlResult>>;

  getVaccineTypeDistribution(
    location: Location
  ): Promise<Array<VaccineTypeDistributionByProvince>>;

  getTotalVaccinesApplicated(location: Location): Promise<Number>;

  getApplicationConditionsByAgeGroup(
    location: Location,
    age_group: string | undefined
  ): Promise<Array<ApplicationConditionsByAgeGroup>>;

  getDailyApplications(
    location: Location
  ): Promise<Array<DailyApplicationsSqlResult>>;

  getApplicationsByAgeGroup(location: Location): Promise<Array<any>>;
}

const configure = (db: IDatabase<any>): VaccineApplicationsRepository => ({
  async getDoseDistributionByAgeGroup(location: Location) {
    return db.many('SELECT * FROM vaccines_applications_by_dose_and_age');
  },
  async getVaccineTypeDistribution(location: Location) {
    return db.many(
      `SELECT vaccine, COUNT(*) FROM applications_by_place ` +
        (location.province
          ? `WHERE application_jurisdiction = ${location.province}`
          : '') +
        `GROUP BY application_jurisdiction`
    );
  },
  async getTotalVaccinesApplicated(location: Location) {
    return db.one(
      `SELECT COUNT(*) FROM applications_by_place ` +
        (location.province
          ? `WHERE application_jurisdiction = ${location.province}`
          : '')
    );
  },
  async getApplicationConditionsByAgeGroup(
    location: Location,
    age_group: string | undefined
  ) {
    return db.many(
      `SELECT application_condition, age_group, COUNT(*) FROM applications_by_place ` +
        (location.province
          ? `WHERE application_jurisdiction = ${location.province}`
          : '') +
        (age_group ? `AND age_group = ${age_group}` : '')
    );
  },
  async getDailyApplications(location: Location) {
    return db.many('SELECT * FROM daily_applications_by_vaccine');
  },
  async getApplicationsByAgeGroup(location: Location) {
    return db.many(
      'SELECT sex, COUNT(*) FROM vaccines_by_dose_and_age GROUP BY sex'
    );
  },
});

export default configure;
