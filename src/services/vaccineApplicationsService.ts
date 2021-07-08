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
}

const configure = (
  vaccineApplicationsRepository: VaccineApplicationsRepository
): VaccineApplicationsService => ({
  async getDoseDistributionByAgeGroup() {
    return vaccineApplicationsRepository
      .getDoseDistributionByAgeGroup()
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
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
});

export default configure;
