import { VaccineApplication } from '../model/vaccineApplication';

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

const extractZip = (source: string | undefined) =>
  new Promise((resolve, reject) => {
    console.log('Started zip extraction');
    return fs
      .createReadStream(source)
      .pipe(unzipper.Extract({ path: ZIP_EXTRACT_FOLDER }))
      .on('finish', () => {
        console.log('Finish zip extracion2', new Date().getTime());
        return resolve;
      });
  });

export const saveVaccineApplicationsFile = async () => {
  console.log('About to download file', new Date().getTime());
  return await axios({
    url: VACCINE_APPLICATIONS_URL,
    method: 'GET',
    responseType: 'arraybuffer',
  })
    .then((response: any) => {
      fs.writeFileSync(
        DEFAULT_FILE_NAME_VACCINE_APPLICATIONS_ZIP,
        response.data
      );
      console.log('FINISH TO DOWNLOAD FILE');
      extractZip(DEFAULT_FILE_NAME_VACCINE_APPLICATIONS_ZIP).then(() => {
        console.log('ESTAMO?');
      });
      console.log('finish extraction?');
    })
    .catch((error: any) => {
      console.log('error while getting vaccines', error);
      return 'ERROR';
    });
};
