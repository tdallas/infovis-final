import { Repositories } from '../repositories/repositories';
import vaccineApplicationsService, {
  VaccineApplicationsService,
} from './vaccineApplicationsService';

export interface Services {
  vaccineApplicationsService: VaccineApplicationsService;
}

const configure = (repositories: Repositories): Services => {
  return {
    vaccineApplicationsService: vaccineApplicationsService(
      repositories.vaccineApplicationsRepository
    ),
  };
};

export default configure;
