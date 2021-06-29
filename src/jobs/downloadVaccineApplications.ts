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

const extractZip = async (source: string | undefined): Promise<string> => {
  try {
    fs.createReadStream(source)
      .pipe(unzipper.Extract({ path: ZIP_EXTRACT_FOLDER }))
      .on('end', () => console.log('Finish zip extracion'));
    return DEFAULT_FILE_NAME_VACCINE_APPLICATIONS || '';
  } catch (error) {
    console.log('Error while extracting', error);
    return 'ERRORASO PA';
  }
};

export const getVaccineApplications = async (): Promise<
  Array<VaccineApplication>
> => {
  return axios({
    url: VACCINE_APPLICATIONS_URL,
    method: 'GET',
    responseType: 'arraybuffer',
  })
    .then((response: any) => {
      fs.writeFile(
        DEFAULT_FILE_NAME_VACCINE_APPLICATIONS_ZIP,
        response.data,
        (err: any) => {
          if (!err) {
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
