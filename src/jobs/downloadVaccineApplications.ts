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
var AdmZip = require('adm-zip');

const extractZip = async (source: string | undefined): Promise<string> => {
  try {
    console.log('About to extract zip', source);
    // reading archives
    var zip = new AdmZip(source);
    zip.extractAllTo(
      /*target path*/ DEFAULT_FILE_NAME_VACCINE_APPLICATIONS,
      /*overwrite*/ true
    );

    console.log('Termino de extraer');
    return DEFAULT_FILE_NAME_VACCINE_APPLICATIONS || '';
  } catch (error) {
    return 'ERRORASO PA';
  }
};

export const getVaccineApplications = async (): Promise<
  Array<VaccineApplication>
> => {
  console.log('About to make request to get vaccines');
  console.log(VACCINE_APPLICATIONS_URL);

  return axios({
    url: VACCINE_APPLICATIONS_URL,
    method: 'GET',
    responseType: 'arraybuffer',
  })
    .then((response: any) => {
      console.log('saving', response.data.length);
      fs.writeFile(
        DEFAULT_FILE_NAME_VACCINE_APPLICATIONS_ZIP,
        response.data,
        (err: any) => {
          if (!err) {
            console.log('finish saving');
            extractZip(DEFAULT_FILE_NAME_VACCINE_APPLICATIONS_ZIP);
          } else {
            console.log('ERROR GUARDADNO ARCHIVO');
          }
        }
      );
    })
    .catch((error: any) => {
      console.log('error while getting vaccinens', error);
      return 'ERROR';
    });
};
