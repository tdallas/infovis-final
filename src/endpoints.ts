import { Repositories } from './repositories/repositories';
import { Services } from './services/services';
import {
  ApplicationsByAgeGroupRequest,
  ByLocationRequest,
  DailyApplicationsRequest,
} from './requests/requests';
import { CountResponse } from './responses/countResponse';

const { paths } = require('../swagger.json');

// '/count',
//   '/last_update',
//   '/vaccines_detail_count',
//   '/vaccines_daily',
//   '/application_conditions',
//   '/applications_sex_dose',
//   '/application_vs_distribution'

const registerVaccineApplicationsEndpoints = (app: any, services: Services) => {
  const { vaccineApplicationsService } = services;
  console.log(paths);
  console.log(Object.keys(paths));

  app.get('/count', async (req: ByLocationRequest, res: CountResponse) => {});

  app.get('/last_update', async (_: any, res: any) => {});

  app.get(
    '/vaccines_detail_count',
    async (req: ByLocationRequest, res: any) => {}
  );

  app.get(
    '/vaccines_daily',
    async (req: DailyApplicationsRequest, res: any) => {}
  );

  app.get(
    '/application_conditions',
    async (req: ApplicationsByAgeGroupRequest, res: any) => {}
  );

  app.get(
    '/applications_sex_dose',
    async (req: ByLocationRequest, res: any) => {}
  );

  app.get('/application_vs_distribution', async (_: any, res: any) => {});

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
