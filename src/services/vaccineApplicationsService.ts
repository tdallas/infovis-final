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

export interface VaccineApplicationsService {
  getDoseDistributionByAgeGroup(): Promise<Array<DoseDistributionByAgeGroup>>;

  // if no province is supplied, look for whole country
  getVaccineDistribution(
    province: string | undefined
  ): Promise<Array<VaccineTypeDistributionByProvince>>;

  // if no province is supplied, look for whole country
  getTotalVaccinesApplicated(province: String | undefined): Promise<Number>;

  getApplicationConditionsByAgeGroup(
    province: String | undefined
  ): Promise<Array<ApplicationConditionsByAgeGroup>>;

  getDailyApplications(): Promise<Array<DailyApplications>>;
}

const configure = (
  vaccineApplicationsRepository: VaccineApplicationsRepository
): VaccineApplicationsService => ({
  async getDoseDistributionByAgeGroup() {
    return vaccineApplicationsRepository
      .getDoseDistributionByAgeGroup()
      .then((response) => {
        return response.map((each) => new DoseDistributionByAgeGroup(each));
      })
      .catch((error) => {
        return [];
      });
  },
  async getVaccineDistribution(province: string | undefined) {
    return [];
  },
  async getTotalVaccinesApplicated(province: string | undefined) {
    return 0;
  },
  async getApplicationConditionsByAgeGroup(province: string | undefined) {
    return [];
  },
  async getDailyApplications() {
    return vaccineApplicationsRepository
      .getDailyApplications()
      .then((response: Array<DailyApplicationsSqlResult>) => {
        return response.map((each) => new DailyApplications(each));
      })
      .catch((error) => {
        return [];
      });
  },
});

export default configure;
