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

  getTotalApplicationsDistributionByVaccine(): Promise<Array<any>>;
}

const whereLocationStatement = (location: Location) => {
  if (location.department && location.province) {
    return (
      `WHERE application_jurisdiction = '${location.province}'` +
      ` AND application_department = '${location.department}' `
    );
  } else if (location.department) {
    return `WHERE application_department = '${location.department}' `;
  } else if (location.province) {
    return `WHERE application_jurisdiction = '${location.province}' `;
  }
  return '';
};

const configure = (db: IDatabase<any>): VaccineApplicationsRepository => ({
  async getTotalApplicationsDistributionByVaccine() {
    return db.many('SELECT * FROM total_applications_by_vaccine_and_dose');
  },
  async getDoseDistributionByAgeGroup(location: Location) {
    return db.many(
      'SELECT age_group, dose_order, vaccine, sex, sum(applications) as applications FROM applications_by_place ' +
        whereLocationStatement(location) +
        ' GROUP BY age_group, dose_order, vaccine, sex ORDER BY age_group'
    );
  },
  async getVaccineTypeDistribution(location: Location) {
    return db.many(
      `SELECT vaccine, COUNT(*) FROM applications_by_place ` +
        whereLocationStatement(location) +
        `GROUP BY application_jurisdiction`
    );
  },
  async getTotalVaccinesApplicated(location: Location) {
    if (!location.department && !location.province)
      return db.one('SELECT * FROM total_applications');
    return db.one(
      `SELECT COUNT(*) FROM applications_by_place ` +
        whereLocationStatement(location)
    );
  },
  async getApplicationConditionsByAgeGroup(
    location: Location,
    age_group: string | undefined
  ) {
    return db.many(
      `SELECT application_condition, age_group, COUNT(*) FROM applications_by_place ` +
        +whereLocationStatement(location) +
        (age_group && (location.province || location.department)
          ? `AND age_group = ${age_group}`
          : age_group
          ? `WHERE age_group = ${age_group}`
          : '')
    );
  },
  async getDailyApplications(location: Location) {
    return db.many(
      'SELECT * FROM daily_applications_by_vaccine' +
        whereLocationStatement(location)
    );
  },
  async getApplicationsByAgeGroup(location: Location) {
    return db.many(
      'SELECT sex, COUNT(*) FROM vaccines_by_dose_and_age ' +
        whereLocationStatement(location) +
        ' GROUP BY sex'
    );
  },
});

export default configure;
