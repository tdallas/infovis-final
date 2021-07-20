import { Services } from './services/services';
import {
  ApplicationsByAgeGroupRequest,
  ByLocationRequest,
  DailyApplicationsRequest,
} from './requests/requests';

const { paths } = require('../swagger.json');

const registerVaccineApplicationsEndpoints = (app: any, services: Services) => {
  const { vaccineApplicationsService } = services;
  console.log(paths);
  console.log(Object.keys(paths));

  app.get('/count', async (req: ByLocationRequest, res: any) => {
    const { province, city } = req.query;
    const response =
      await vaccineApplicationsService.getTotalVaccinesApplicated({
        province,
        city,
      });
    res.send(response);
  });

  app.get('/last_update', async (_: any, res: any) => {});

  app.get(
    '/vaccines_detail_count',
    async (req: ByLocationRequest, res: any) => {
      const { province, city } = req.query;
      const response =
        await vaccineApplicationsService.getDetailedVaccineDistribution({
          province,
          city,
        });
      res.send(response);
    }
  );

  app.get(
    '/vaccines_daily',
    async (req: DailyApplicationsRequest, res: any) => {
      const { province, city, from_date, to_date } = req.query;
      const response = await vaccineApplicationsService.getDailyApplications(
        {
          province,
          city,
        },
        from_date,
        to_date
      );
      res.send(response);
    }
  );

  app.get(
    '/application_conditions',
    async (req: ApplicationsByAgeGroupRequest, res: any) => {
      const { province, city, age_group } = req.query;
      const response =
        await vaccineApplicationsService.getApplicationConditionsByAgeGroupFrom(
          {
            province,
            city,
          },
          age_group
        );
      res.send(response);
    }
  );

  app.get(
    '/applications_sex_dose',
    async (req: ByLocationRequest, res: any) => {
      const { province, city } = req.query;
      const response = await vaccineApplicationsService.getVaccinesBySexAndDose(
        {
          province,
          city,
        }
      );
      res.send(response);
    }
  );

  app.get('/application_vs_distribution', async (_: any, res: any) => {
    const response =
      await vaccineApplicationsService.getApplicationsVsDistribution();
    res.send(response);
  });

  app.get(
    '/vaccine_dose_distribution',
    async (req: ByLocationRequest, res: any) => {
      const { province, city } = req.query;
      const response = await vaccineApplicationsService.getVaccineDistribution({
        province,
        city,
      });
      res.send(response);
    }
  );
};

export const registerEndpoints = (app: any, services: Services) => {
  registerVaccineApplicationsEndpoints(app, services);
};
