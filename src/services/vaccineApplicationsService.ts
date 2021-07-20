import { VaccineApplicationsRepository } from '../repositories/vaccineApplicationsRepository';
import { ApplicationConditionsResponse } from '../responses/applicationConditionsResponse';
import { ApplicationSexDoseResponse } from '../responses/applicationSexDoseResponse';
import {
  ApplicationVsDistributionResponse,
  ApplicationVsDistributionSqlResult,
} from '../responses/applicationVsDistributionResponse';
import { VaccinesDailyResponse } from '../responses/vaccinesDailyResponse';
import { VaccinesDetailByVaccineAndDoseResponse } from '../responses/vaccinesDetailByVaccineAndDoseResponse';
import { VaccinesDetailCountResponse } from '../responses/vaccinesDetailCountResponse';

export interface Location {
  province: string | undefined;
  city: string | undefined;
}

export interface VaccineApplicationsService {
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
    from_date: Date,
    to_date: Date
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
  async getVaccineDistribution(location: Location) {
    return [];
  },
  async getDetailedVaccineDistribution(location: Location) {
    return [];
  },
  async getTotalVaccinesApplicated(location: Location) {
    return 0;
  },
  async getApplicationConditionsByAgeGroupFrom(
    location: Location,
    age_group: string | undefined
  ) {
    return [];
  },
  async getDailyApplications(
    location: Location,
    from_date: Date,
    to_date: Date
  ) {
    return [];
  },
  async getVaccinesBySexAndDose(location: Location) {
    return [];
  },
  async getApplicationsVsDistribution() {
    return [];
  },
});

export default configure;
