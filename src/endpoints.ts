import { Repositories } from './repositories/repositories';
import { Services } from './services/services';
import {
  ApplicationsByAgeGroupRequest,
  ByLocationRequest,
} from './requests/requests';

const registerVaccineApplicationsEndpoints = (app: any, services: Services) => {
  const { vaccineApplicationsService } = services;

  app.get(
    '/doseDistributionByAgeGroup',
    async (req: ApplicationsByAgeGroupRequest, res: any) => {
      const response =
        await vaccineApplicationsService.getDoseDistributionByAgeGroup(
          req.query
        );
      return res.send(response);
    }
  );

  app.get('/dailyApplications', async (req: ByLocationRequest, res: any) => {
    const response = await vaccineApplicationsService.getDailyApplications(
      req.query
    );
    return res.send(response);
  });
};

export const registerEndpoints = (app: any, services: Services) => {
  registerVaccineApplicationsEndpoints(app, services);
};
