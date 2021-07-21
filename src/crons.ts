import { IDatabase } from 'pg-promise';
import { saveVaccineApplicationsFile } from './jobs/applications/downloadVaccineApplications';
import { saveVaccineReceptions } from './jobs/receptions/downloadVaccineReceptions';
import { refreshViewsQueries } from './repositories/initializeDb';

const cron = require('node-cron');

export const registerCrons = (db: IDatabase<any>) => {
  // Schedule tasks to be run on the server.
  cron.schedule('0 0 * * *', async () => {
    console.log('Running sync with vaccines data');

    await syncData(db);
  });
};

export const syncData = async (db: IDatabase<any>) => {
  if (Boolean(process.env.DELETE)) {
    console.log('deleting entries');
    await db.none('DELETE FROM vaccine_applications');
    await db.none('DELETE FROM vaccine_receptions');
  }

  saveVaccineApplicationsFile(db).then(async () => {
    console.log('finish to do applications');
    console.log('refreshin mat vews');
    Promise.all(
      refreshViewsQueries().map((refreshQuery) => db.none(refreshQuery))
    ).then(async () => {
      console.log('finish refreshing mat views');
      console.log('updating last update');
      if (
        (await db.one('SELECT COUNT(*) FROM last_update WHERE id = 1')).count !=
        0
      ) {
        await db.none(
          `UPDATE last_update SET last_update = ${new Date()} WHERE id = 1`
        );
      } else {
        await db.none(`INSERT INTO last_update VALUES (1, ${new Date()})`);
      }
    });
  });

  saveVaccineReceptions(db).then(async () => {
    console.log('finish to do receptions');
    db.one('SELECT COUNT(*) FROM vaccine_receptions');
    if (
      (await db.one('SELECT COUNT(*) FROM last_update WHERE id = 2')).count != 0
    ) {
      await db.none(
        `UPDATE last_update SET last_update = ${new Date()} WHERE id = 2`
      );
    } else {
      await db.none(`INSERT INTO last_update VALUES (2, ${new Date()})`);
    }
  });
};
