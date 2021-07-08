import { IDatabase } from 'pg-promise';
import { getDoseDistributionByAgeGroupQuery } from './queries';

export interface DoseDistributionByAgeGroup {}

export interface VaccineTypeDistributionByProvince {}

export interface ApplicationConditionsByAgeGroup {}

export interface VaccineApplicationsRepository {
  getDoseDistributionByAgeGroup(): Promise<Array<DoseDistributionByAgeGroup>>;

  getVaccineTypeDistributionByProvince(): Promise<
    Array<VaccineTypeDistributionByProvince>
  >;

  getTotalVaccinesApplicated(province: String | undefined): Promise<Number>;

  getApplicationConditionsByAgeGroup(
    province: String | undefined
  ): Promise<Array<ApplicationConditionsByAgeGroup>>;
}

const configure = (db: IDatabase<any>): VaccineApplicationsRepository => ({
  async getDoseDistributionByAgeGroup() {
    return db.many(getDoseDistributionByAgeGroupQuery);
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
