import { IDatabase } from 'pg-promise';
import { saveVaccineApplicationsFile } from './jobs/downloadVaccineApplications';
import Repositories from './repositories/repositories';
import Services from './services/services';
import initilizeDbQueries, {
  refreshViewsQueries,
} from './repositories/initializeDb';
import {
  ApplicationsByAgeGroupRequest,
  ByLocationRequest,
} from './requests/requests';

const express = require('express');
const cron = require('node-cron');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = 8000;

const initializeDb = (db: IDatabase<any>) => {
  return initilizeDbQueries.map((query: string) => db.none(query));
};

const syncData = async (db: IDatabase<any>) => {
  const amountOfRecords = await db.any(
    'SELECT COUNT(*) FROM vaccine_applications'
  );
  if (amountOfRecords[0].count != 0) {
    console.log('deleting entries');
    await db.none('DELETE FROM vaccine_applications');
  }

  saveVaccineApplicationsFile(db).then(async () => {
    console.log('finish to do everything');
    console.log('refreshin mat vews');
    Promise.all(
      refreshViewsQueries().map((refreshQuery) => db.none(refreshQuery))
    ).then(() => {
      console.log('finish refreshing mat views');
    });
  });
};

const start = async (db: IDatabase<any>) => {
  console.log('initializing database if needed');
  await Promise.all(initializeDb(db));

  const { vaccineApplicationsRepository } = Repositories(db);
  const { vaccineApplicationsService } = Services({
    vaccineApplicationsRepository,
  });

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

  // Schedule tasks to be run on the server.
  cron.schedule('0 0 * * *', async () => {
    console.log('Running sync with vaccines data');

    await syncData(db);
  });

  // Schedule tasks to be run on the server.
  cron.schedule('0 0 30 * *', async () => {
    console.log('running view refresh');
    await refreshViewsQueries().map((refreshQuery) => db.none(refreshQuery));
  });

  app.listen(PORT, async () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    // await syncData(db);
  });
};

const databaseConfig = {
  host: 'localhost',
  port: 5432,
  database: 'infovis',
  user: 'postgres',
};

const pgp = require('pg-promise')({});

pgp(databaseConfig)
  .connect()
  .then((db: IDatabase<any>) => start(db))
  .catch((error: any) =>
    console.log('There was an error connecting to the db', error)
  );
