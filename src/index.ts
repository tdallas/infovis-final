const express = require('express');
const cron = require('node-cron');
require('dotenv').config();

const {
  getVaccineApplications,
} = require('./jobs/downloadVaccineApplications');

const app = express();
const PORT = 8000;

app.get('/', (req: any, res: any) => res.send('Express + TypeScript Server'));

// Schedule tasks to be run on the server.
// cron.schedule('*/10 * * * *', function () {
//   console.log('running a task every minute');
//   console.log(getVaccineApplications());
// });

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  getVaccineApplications();
});
