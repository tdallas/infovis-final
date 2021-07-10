import { VaccineApplicationsRepository } from '../repositories/vaccineApplicationsRepository';
import {
  DoseDistributionByAgeGroup,
  VaccineTypeDistributionByProvince,
  ApplicationConditionsByAgeGroup,
} from '../repositories/vaccineApplicationsRepository';

export interface VaccineApplicationsService {
  getDoseDistributionByAgeGroup(): Promise<Array<DoseDistributionByAgeGroup>>;

  getVaccineTypeDistributionByProvince(): Promise<
    Array<VaccineTypeDistributionByProvince>
  >;

  getTotalVaccinesApplicated(province: String | undefined): Promise<Number>;

  getApplicationConditionsByAgeGroup(
    province: String | undefined
  ): Promise<Array<ApplicationConditionsByAgeGroup>>;

  getDailyApplications(): Promise<Array<any>>;
}

const configure = (
  vaccineApplicationsRepository: VaccineApplicationsRepository
): VaccineApplicationsService => ({
  async getDoseDistributionByAgeGroup() {
    return vaccineApplicationsRepository
      .getDoseDistributionByAgeGroup()
      .then((response) => {
        return response;
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
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return [];
      });
  },
});

export default configure;
