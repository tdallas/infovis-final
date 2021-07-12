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

  getVaccineDistribution(
    location: Location
  ): Promise<Array<VaccineTypeDistributionByProvince>>;

  getDetailedVaccineDistribution(
    location: Location
  ): Promise<Array<VaccineTypeDistributionByProvince>>;

  getTotalVaccinesApplicated(location: Location): Promise<Number>;

  getApplicationConditionsByAgeGroup(
    age_group: string | undefined
  ): Promise<Array<ApplicationConditionsByAgeGroup>>;

  getApplicationConditionsByAgeGroupFrom(
    location: Location,
    age_group: string | undefined
  ): Promise<Array<ApplicationConditionsByAgeGroup>>;

  getDailyApplications(
    location: Location
  ): Promise<Array<DailyApplicationsSqlResult>>;

  getApplicationsByAgeGroup(age_group: string | undefined): Promise<Array<any>>;

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
  async getVaccineDistribution(location: Location) {
    return db.many(
      `SELECT vaccine, sum(applications) as applications FROM applications_by_place ` +
        whereLocationStatement(location) +
        'GROUP BY vaccine'
    );
  },
  async getDetailedVaccineDistribution(location: Location) {
    return db.many(
      `SELECT vaccine, sum(applications) as applications, application_jurisdiction,
       application_department FROM applications_by_place ` +
        whereLocationStatement(location) +
        ' GROUP BY vaccine, application_jurisdiction, application_department'
    );
  },
  async getTotalVaccinesApplicated(location: Location) {
    if (!location.department && !location.province)
      return db.one('SELECT * FROM total_applications');
    return db.one(
      `SELECT SUM(applications) FROM applications_by_place ` +
        whereLocationStatement(location)
    );
  },
  async getApplicationConditionsByAgeGroup(age_group: string | undefined) {
    return db.many(
      `SELECT age_group, application_condition, SUM(applicationns) FROM applications_conditions_by_place ` +
        (age_group ? `WHERE age_group = ${age_group}` : '') +
        'GROUP BY application_condition, age_group'
    );
  },
  async getApplicationConditionsByAgeGroupFrom(
    location: Location,
    age_group: string | undefined
  ) {
    return db.many(
      `SELECT age_group, application_condition, SUM(applicationns) FROM applications_conditions_by_place ` +
        whereLocationStatement(location) +
        (age_group && (location.province || location.department)
          ? `AND age_group = ${age_group}`
          : age_group
          ? `WHERE age_group = ${age_group}`
          : '') +
        'GROUP BY application_condition, age_group'
    );
  },
  async getDailyApplications(location: Location) {
    return db.many(
      'SELECT * FROM daily_applications_by_vaccine' +
        whereLocationStatement(location)
    );
  },
  async getApplicationsByAgeGroup(age_group: string | undefined) {
    return db.many(
      'SELECT age_group, sex, SUM(applications) FROM vaccines_applications_by_dose_and_age ' +
        ` WHERE age_group = ${age_group}` +
        ' GROUP BY age_group, sex'
    );
  },
});

export default configure;
