const fs = require('fs');
const axios = require('axios');

const unzipper = require('unzipper');

const { readCsvAndPersist } = require('./vaccineApplicationsCsvParse');

export const saveVaccineApplicationsFile = async (db: any): Promise<any> => {
  console.log('About to download applications file', new Date());
  return axios({
    url: process.env.VACCINE_APPLICATIONS_URL,
    method: 'GET',
    responseType: 'arraybuffer',
    timeout: 40000,
  })
    .then(async (response: any) => {
      console.log('escribiendo archivo');
      try {
        fs.writeFileSync(
          process.env.DEFAULT_FILE_NAME_VACCINE_APPLICATIONS_ZIP,
          response.data
        );
      } catch (error) {
        console.log('error escribiendo archivo', error);
        return;
      }
      console.log('FINISH TO DOWNLOAD FILE');
      return new Promise((resolve, reject) =>
        fs
          .createReadStream(
            process.env.DEFAULT_FILE_NAME_VACCINE_APPLICATIONS_ZIP
          )
          .pipe(unzipper.Extract({ path: process.env.ZIP_EXTRACT_FOLDER }))
          .on('finish', () => {
            console.log('Finish zip extracion2', new Date());
            return resolve(readCsvAndPersist(db));
          })
      );
    })
    .catch((error: any) => {
      console.log('error while getting vaccines', error);
      return error;
    });
};
