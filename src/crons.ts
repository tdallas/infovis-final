import { IDatabase } from 'pg-promise';
import { saveVaccineApplicationsFile } from './jobs/downloadVaccineApplications';
import { refreshViewsQueries } from './repositories/initializeDb';

const cron = require('node-cron');

export const registerCrons = (db: IDatabase<any>) => {
  // Schedule tasks to be run on the server.
  cron.schedule('0 0 * * *', async () => {
    console.log('Running sync with vaccines data');

    await syncData(db);
  });
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
