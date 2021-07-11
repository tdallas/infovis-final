import { VaccineApplicationsRepository } from '../repositories/vaccineApplicationsRepository';
import {
  VaccineTypeDistributionByProvince,
  ApplicationConditionsByAgeGroup,
} from '../repositories/vaccineApplicationsRepository';
import {
  DailyApplications,
  DailyApplicationsSqlResult,
} from '../responses/dailyApplications';
import { DoseDistributionByAgeGroup } from '../responses/doseDistributionByAgeGroup';

export interface Location {
  province: string | undefined;
  department: string | undefined;
}

export interface VaccineApplicationsService {
  getDoseDistributionByAgeGroup(
    location: Location
  ): Promise<Array<DoseDistributionByAgeGroup>>;

  // if no province is supplied, look for whole country
  getVaccineDistribution(
    location: Location
  ): Promise<Array<VaccineTypeDistributionByProvince>>;

  // if no province is supplied, look for whole country
  getTotalVaccinesApplicated(location: Location): Promise<Number>;

  getApplicationConditionsByAgeGroup(
    location: Location
  ): Promise<Array<ApplicationConditionsByAgeGroup>>;

  getDailyApplications(location: Location): Promise<Array<DailyApplications>>;
}

const configure = (
  vaccineApplicationsRepository: VaccineApplicationsRepository
): VaccineApplicationsService => ({
  async getDoseDistributionByAgeGroup(location: Location) {
    return vaccineApplicationsRepository
      .getDoseDistributionByAgeGroup(location)
      .then((response) => {
        return response.map((each) => new DoseDistributionByAgeGroup(each));
      })
      .catch((error) => {
        return [];
      });
  },
  async getVaccineDistribution(location: Location) {
    return [];
  },
  async getTotalVaccinesApplicated(location: Location) {
    return 0;
  },
  async getApplicationConditionsByAgeGroup(location: Location) {
    return [];
  },
  async getDailyApplications(location: Location) {
    return vaccineApplicationsRepository
      .getDailyApplications(location)
      .then((response: Array<DailyApplicationsSqlResult>) => {
        return response.map((each) => new DailyApplications(each));
      })
      .catch((error) => {
        return [];
      });
  },
});

export default configure;
