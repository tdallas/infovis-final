const express = require('express');
const cron = require('node-cron');
require('dotenv').config();

const {
  saveVaccineApplicationsFile,
} = require('./jobs/downloadVaccineApplications');
const {
  readCsvAndPersist,
} = require('./persistence/vaccineApplicationsRepository');

const app = express();
const PORT = 8000;

app.get('/', (req: any, res: any) => res.send('Express + TypeScript Server'));

const databaseConfig = {
  host: 'localhost',
  port: 5432,
  database: 'infovis',
  user: 'postgres',
};

const pgp = require('pg-promise')({});
const db = pgp(databaseConfig);

// Schedule tasks to be run on the server.
cron.schedule('*/10 * * * *', function () {
  console.log('running a task every minute');
  // console.log(saveVaccineApplicationsFile());
});

app.listen(PORT, async () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  await saveVaccineApplicationsFile();
  console.log('Supuestamente termino');
});
