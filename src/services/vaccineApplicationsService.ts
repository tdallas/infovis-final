import { VaccineApplicationsRepository } from '../repositories/vaccineApplicationsRepository';

interface DoseDistributionByAgeGroup {}

interface VaccineTypeDistributionByProvince {}

interface ApplicationConditionsByAgeGroup {}

export interface VaccineApplicationsService {
  getDoseDistributionByAgeGroup(): Array<DoseDistributionByAgeGroup>;

  getVaccineTypeDistributionByProvince(): Array<VaccineTypeDistributionByProvince>;

  getTotalVaccinesApplicated(province: String | undefined): Number;

  getApplicationConditionsByAgeGroup(
    province: String | undefined
  ): Array<ApplicationConditionsByAgeGroup>;
}

const configure = (
  vaccineApplicationsRepository: VaccineApplicationsRepository
): VaccineApplicationsService => ({
  getDoseDistributionByAgeGroup() {
    return [];
  },
  getVaccineTypeDistributionByProvince() {
    return [];
  },
  getTotalVaccinesApplicated() {
    return 0;
  },
  getApplicationConditionsByAgeGroup() {
    return [];
  },
});

export default configure;
