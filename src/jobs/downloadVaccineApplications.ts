import { VaccineApplication } from '../models/vaccineApplication';

const fs = require('fs');
const axios = require('axios');

const VACCINE_APPLICATIONS_URL: string | undefined =
  process.env.VACCINE_APPLICATIONS_URL;
const ZIP_EXTRACT_FOLDER: string | undefined = process.env.ZIP_EXTRACT_FOLDER;
const DEFAULT_FILE_NAME_VACCINE_APPLICATIONS: string | undefined =
  process.env.DEFAULT_FILE_NAME_VACCINE_APPLICATIONS;
const DEFAULT_FILE_NAME_VACCINE_APPLICATIONS_ZIP: string | undefined =
  process.env.DEFAULT_FILE_NAME_VACCINE_APPLICATIONS_ZIP;

const unzipper = require('unzipper');

const {
  readCsvAndPersist,
} = require('../persistence/vaccineApplicationsRepository');

export const saveVaccineApplicationsFile = async (db: any) => {
  console.log('About to download file', new Date().getTime());
  return axios({
    url: VACCINE_APPLICATIONS_URL,
    method: 'GET',
    responseType: 'arraybuffer',
  })
    .then(async (response: any) => {
      fs.writeFileSync(
        DEFAULT_FILE_NAME_VACCINE_APPLICATIONS_ZIP,
        response.data
      );
      console.log('FINISH TO DOWNLOAD FILE');
      return await fs
        .createReadStream(DEFAULT_FILE_NAME_VACCINE_APPLICATIONS_ZIP)
        .pipe(unzipper.Extract({ path: ZIP_EXTRACT_FOLDER }))
        .on('finish', () => {
          console.log('Finish zip extracion2', new Date().getTime());
          readCsvAndPersist(db).then(() => console.log('terminamos'));
        });
    })
    .catch((error: any) => {
      console.log('error while getting vaccines', error);
      return 'ERROR';
    });
};
