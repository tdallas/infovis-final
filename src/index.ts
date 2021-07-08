import { IDatabase } from 'pg-promise';
import { saveVaccineApplicationsFile } from './jobs/downloadVaccineApplications';
import Repositories from './repositories/repositories';
import Services from './services/services';

const express = require('express');
const cron = require('node-cron');

require('dotenv').config();

// const {
//   saveVaccineApplicationsFile,
// } = require('./jobs/downloadVaccineApplications');

const app = express();
const PORT = 8000;

const OFFSET = 1000000;

const start = async (db: IDatabase<any>) => {
  const { vaccineApplicationsRepository } = Repositories(db);
  const { vaccineApplicationsService } = Services({
    vaccineApplicationsRepository,
  });

  app.get('/', async (req: any, res: any) => {
    const response =
      await vaccineApplicationsService.getDoseDistributionByAgeGroup();
    return res.send(response);
  });

  // Schedule tasks to be run on the server.
  cron.schedule('0 0 * * *', async () => {
    console.log('Running sync with vaccines data');

    const amountOfRecords = await db.any(
      'SELECT COUNT(*) FROM vaccine_applications'
    );
    if (amountOfRecords[0].count != 0) {
      const numbersOfIteraions = amountOfRecords[0].count / OFFSET + 1;
      console.log('numbersOfIteraions', numbersOfIteraions);
      for (var i = 0; i < numbersOfIteraions; i++) {
        console.log('deleting records from ', i + 'to', OFFSET + i);
        console.log('');
        await db.none(
          `DELETE FROM vaccine_applications WHERE id < ${
            i + OFFSET
          } AND id >= ${i}`
        );
        console.log('records deleted');
        console.log('');
      }
    }

    await saveVaccineApplicationsFile(db);
    // TODO create mat views here
  });

  app.listen(PORT, async () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
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
