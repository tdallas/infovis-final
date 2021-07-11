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

  getVaccineTypeDistributionByProvince(): Promise<
    Array<VaccineTypeDistributionByProvince>
  >;

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
  async getVaccineTypeDistributionByProvince() {
    return [];
  },
  async getTotalVaccinesApplicated() {
    return 0;
  },
  async getApplicationConditionsByAgeGroup() {
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
