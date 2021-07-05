import { IDatabase } from 'pg-promise';

const express = require('express');
const cron = require('node-cron');

require('dotenv').config();

// const {
//   saveVaccineApplicationsFile,
// } = require('./jobs/downloadVaccineApplications');

const app = express();
const PORT = 8000;

const start = async (db: IDatabase<any>) => {
  console.log(
    'EMPEZAMO',
    await db.any('SELECT COUNT(*) FROM vaccine_applications')
  );

  app.get('/', (req: any, res: any) => res.send('Express + TypeScript Server'));

  // Schedule tasks to be run on the server.
  cron.schedule('*/10 * * * *', async () => {
    console.log('running a task every minute');
    // await saveVaccineApplicationsFile(db);
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
