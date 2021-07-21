import { LastUpdateResultSql } from '../models/lastUpdate';
import { VaccineApplicationsRepository } from '../repositories/vaccineApplicationsRepository';
import { ApplicationConditionsResponse } from '../responses/applicationConditionsResponse';
import { ApplicationSexDoseResponse } from '../responses/applicationSexDoseResponse';
import {
  ApplicationVsDistributionResponse,
  ApplicationVsDistributionSqlResult,
} from '../responses/applicationVsDistributionResponse';
import { CountResponse } from '../responses/countResponse';
import { VaccinesDailyResponse } from '../responses/vaccinesDailyResponse';
import { VaccinesDetailByVaccineAndDoseResponse } from '../responses/vaccinesDetailByVaccineAndDoseResponse';
import { VaccinesDetailCountResponse } from '../responses/vaccinesDetailCountResponse';

export interface Location {
  province: string | undefined;
  city: string | undefined;
}

export interface LastUpdateStacked {
  applications_last_update: Date | undefined;
  receptions_last_update: Date | undefined;
}

export interface VaccineApplicationsService {
  getLastUpdate(): Promise<LastUpdateStacked>;

  getVaccineDistribution(
    location: Location
  ): Promise<Array<VaccinesDetailByVaccineAndDoseResponse>>;

  getDetailedVaccineDistribution(
    location: Location
  ): Promise<Array<VaccinesDetailCountResponse>>;

  getTotalVaccinesApplicated(location: Location): Promise<Number>;

  getApplicationConditionsByAgeGroupFrom(
    location: Location,
    age_group: string | undefined
  ): Promise<Array<ApplicationConditionsResponse>>;

  getDailyApplications(
    location: Location,
    from_date: Date | undefined,
    to_date: Date | undefined
  ): Promise<Array<VaccinesDailyResponse>>;

  getVaccinesBySexAndDose(
    location: Location
  ): Promise<Array<ApplicationSexDoseResponse>>;

  getApplicationsVsDistribution(): Promise<
    Array<ApplicationVsDistributionResponse>
  >;
}

const configure = (
  vaccineApplicationsRepository: VaccineApplicationsRepository
): VaccineApplicationsService => ({
  async getLastUpdate() {
    const sqlLastUpdates = await vaccineApplicationsRepository.getLastUpdate();
    var result: LastUpdateStacked = {
      applications_last_update: undefined,
      receptions_last_update: undefined,
    };
    sqlLastUpdates.forEach((each) => {
      if (each.id === 1) {
        result['applications_last_update'] = each.last_update;
      } else {
        result['receptions_last_update'] = each.last_update;
      }
    });

    return result;
  },
  async getVaccineDistribution(location: Location) {
    return vaccineApplicationsRepository
      .getVaccineDistribution(location)
      .then((result) =>
        result.map((each) => new VaccinesDetailByVaccineAndDoseResponse(each))
      )
      .catch((error) => {
        console.log('error in getVaccineDistribution');
        return error;
      });
  },
  async getDetailedVaccineDistribution(location: Location) {
    return vaccineApplicationsRepository
      .getDetailedVaccineDistribution(location)
      .then((result) =>
        result.map((each) => new VaccinesDetailCountResponse(each))
      )
      .catch((error) => {
        console.log('error in getDetailedVaccineDistribution');
        return error;
      });
  },
  async getTotalVaccinesApplicated(location: Location) {
    return vaccineApplicationsRepository
      .getTotalVaccinesApplicated(location)
      .then((result) => new CountResponse(result))
      .catch((error) => {
        console.log('error in getTotalVaccinesApplicated');
        return error;
      });
  },
  async getApplicationConditionsByAgeGroupFrom(
    location: Location,
    age_group: string | undefined
  ) {
    return vaccineApplicationsRepository
      .getApplicationConditionsByAgeGroupFrom(location, age_group)
      .then((result) =>
        result.map((each) => new ApplicationConditionsResponse(each))
      )
      .catch((error) => {
        console.log('error in getApplicationConditionsByAgeGroupFrom', error);
        return error;
      });
  },
  async getDailyApplications(
    location: Location,
    from_date: Date,
    to_date: Date
  ) {
    return vaccineApplicationsRepository
      .getDailyApplications(location, from_date, to_date)
      .then((result) => result.map((each) => new VaccinesDailyResponse(each)))
      .catch((error) => {
        console.log('error in getDailyApplications', error);
        return error;
      });
  },
  async getVaccinesBySexAndDose(location: Location) {
    return vaccineApplicationsRepository
      .getVaccinesBySexAndDose(location)
      .then((result) =>
        result.map((each) => new ApplicationSexDoseResponse(each))
      )
      .catch((error) => {
        console.log('error in getVaccinesBySexAndDose', error);
        return error;
      });
  },
  async getApplicationsVsDistribution() {
    return vaccineApplicationsRepository
      .getApplicationsVsDistribution()
      .then((result) =>
        result.map((each) => new ApplicationVsDistributionResponse(each))
      )
      .catch((error) => {
        console.log('error in getApplicationsVsDistribution', error);
        return error;
      });
  },
});

export default configure;
