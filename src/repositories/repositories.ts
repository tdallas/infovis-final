import { IDatabase } from 'pg-promise';
import vaccineApplicationsRepository, {
  VaccineApplicationsRepository,
} from './vaccineApplicationsRepository';

export interface Repositories {
  vaccineApplicationsRepository: VaccineApplicationsRepository;
}

const configure = (db: IDatabase<any>): Repositories => {
  return {
    vaccineApplicationsRepository: vaccineApplicationsRepository(db),
  };
};

export default configure;
