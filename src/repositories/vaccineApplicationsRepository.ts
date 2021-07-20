import { IDatabase } from 'pg-promise';
import { ApplicationConditionsSqlResult } from '../responses/applicationConditionsResponse';
import { ApplicationSexDoseSqlResult } from '../responses/applicationSexDoseResponse';
import { ApplicationVsDistributionSqlResult } from '../responses/applicationVsDistributionResponse';
import { DailyApplicationsSqlResult } from '../responses/dailyApplications';
import { VaccinesDetailByVaccineAndDoseSqlResult } from '../responses/vaccinesDetailByVaccineAndDoseResponse';
import { VaccinesDetailCountSqlResult } from '../responses/vaccinesDetailCountResponse';
import { Location } from '../services/vaccineApplicationsService';

export interface VaccineApplicationsRepository {
  getVaccineDistribution(
    location: Location
  ): Promise<Array<VaccinesDetailByVaccineAndDoseSqlResult>>;

  getDetailedVaccineDistribution(
    location: Location
  ): Promise<Array<VaccinesDetailCountSqlResult>>;

  getTotalVaccinesApplicated(location: Location): Promise<Number>;

  getApplicationConditionsByAgeGroupFrom(
    location: Location,
    age_group: string | undefined
  ): Promise<Array<ApplicationConditionsSqlResult>>;

  getDailyApplications(
    location: Location
  ): Promise<Array<DailyApplicationsSqlResult>>;

  getVaccinesBySexAndDose(
    location: Location
  ): Promise<Array<ApplicationSexDoseSqlResult>>;

  getApplicationsVsDistribution(): Promise<
    Array<ApplicationVsDistributionSqlResult>
  >;
}

const whereLocationStatement = (location: Location) => {
  if (location.city && location.province) {
    return (
      `WHERE application_jurisdiction = '${location.province}'` +
      ` AND application_department = '${location.city}' `
    );
  } else if (location.city) {
    return `WHERE application_department = '${location.city}' `;
  } else if (location.province) {
    return `WHERE application_jurisdiction = '${location.province}' `;
  }
  return '';
};

const configure = (db: IDatabase<any>): VaccineApplicationsRepository => ({
  async getVaccineDistribution(location: Location) {
    const locationCondition = location.province || location.city;

    return db.many(
      `SELECT vaccine, sum(applications) as applications FROM applications_by_place ` +
        whereLocationStatement(location) +
        'GROUP BY vaccine'
    );
  },
  async getDetailedVaccineDistribution(location: Location) {
    const locationCondition = location.province || location.city;
    return db.many(
      `SELECT vaccine, SUM(applications) as count, ${
        locationCondition
          ? `application_jurisdiction as province,
       application_department as city,`
          : ''
      } age_group, sex, dose_order as dose FROM applications_by_place ` +
        whereLocationStatement(location) +
        ' GROUP BY vaccine, application_jurisdiction, application_department, age_group, sex, dose_order'
    );
  },
  async getTotalVaccinesApplicated(location: Location) {
    if (!location.city && !location.province)
      return db.one('SELECT * FROM total_applications');
    return db.one(
      `SELECT SUM(applications) FROM applications_by_place ` +
        whereLocationStatement(location)
    );
  },
  async getApplicationConditionsByAgeGroupFrom(
    location: Location,
    age_group: string | undefined
  ) {
    const locationCondition = location.province || location.city;

    return db.many(
      `SELECT application_condition, sex, age_group, ${
        locationCondition ? 'province, city' : ''
      }, city, SUM(count) FROM applications_conditions_by_place ` +
        whereLocationStatement(location) +
        locationCondition
        ? ` AND age_group = ${age_group} `
        : `WHERE age_group = ${age_group} ` +
            `GROUP BY application_condition, age_group ${
              locationCondition ? 'province. city' : ''
            }`
    );
  },
  async getDailyApplications(location: Location) {
    return db.many(
      'SELECT * FROM daily_applications_by_vaccine' +
        whereLocationStatement(location)
    );
  },
  async getApplicationsVsDistribution() {
    return db.many(
      'SELECT dosis_received, totalApplications as vaccines_count FROM total_applications, total_receptions'
    );
  },
  async getVaccinesBySexAndDose(location: Location) {
    const locationCondition = location.province || location.city;
    return db.many(
      `SELECT vaccine, dose_order AS dose, sex, SUM(applications), 
        ${
          locationCondition
            ? `application_jurisdiction AS province, application_department AS city`
            : ''
        } FROM applications_by_place` + whereLocationStatement(location)
    );
  },
});

export default configure;
