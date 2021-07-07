const fs = require('fs');
const axios = require('axios');

const unzipper = require('unzipper');

const { readCsvAndPersist } = require('./vaccineApplicationsCsvParse');

export const saveVaccineApplicationsFile = async (db: any) => {
  console.log('About to download file', new Date().getTime());
  return axios({
    url: process.env.VACCINE_APPLICATIONS_URL,
    method: 'GET',
    responseType: 'arraybuffer',
  })
    .then(async (response: any) => {
      fs.writeFileSync(
        process.env.DEFAULT_FILE_NAME_VACCINE_APPLICATIONS_ZIP,
        response.data
      );
      console.log('FINISH TO DOWNLOAD FILE');
      return await fs
        .createReadStream(
          process.env.DEFAULT_FILE_NAME_VACCINE_APPLICATIONS_ZIP
        )
        .pipe(unzipper.Extract({ path: process.env.ZIP_EXTRACT_FOLDER }))
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
