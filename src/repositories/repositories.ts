import { IDatabase } from 'pg-promise';
import vaccineApplicationsRepository, {
  VaccineApplicationsRepository,
} from './vaccineApplicationsRepository';

export interface Repositories {
  vaccineApplicationsRepository: VaccineApplicationsRepository;
}

export const configure = (db: IDatabase<any>): Repositories => {
  return {
    vaccineApplicationsRepository: vaccineApplicationsRepository(db),
  };
};
