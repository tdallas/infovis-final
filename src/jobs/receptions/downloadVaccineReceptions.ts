import { VaccineReception } from '../../models/vaccineReception';

const fs = require('fs');
const axios = require('axios');

const xlsx = require('xlsx');

const pgp = require('pg-promise')({
  /* initialization options */
  capSQL: true, // capitalize all generated SQL
});

const cs = new pgp.helpers.ColumnSet(
  ['id', 'reception_date', 'dosis_received'],
  { table: 'vaccine_receptions' }
);

export const saveVaccineReceptions = async (db: any): Promise<any> => {
  console.log('About to download receptions file', new Date());
  return axios({
    url: process.env.VACCINE_RECEPTIONS_URL,
    method: 'GET',
    responseType: 'arraybuffer',
    timeout: 40000,
  })
    .then(async (response: any) => {
      console.log('escribiendo archivo');
      try {
        fs.writeFileSync(
          process.env.DEFAULT_FILE_NAME_VACCINE_RECEPTIONS,
          response.data
        );
        const workbook = xlsx.readFile(
          process.env.DEFAULT_FILE_NAME_VACCINE_RECEPTIONS,
          { cellDates: true }
        );
        const sheet_name_list = workbook.SheetNames;
        const array = xlsx.utils
          .sheet_to_json(workbook.Sheets[sheet_name_list[0]])
          .map(
            (each: any, index: number) =>
              new VaccineReception(
                index,
                each.fecha_de_creacion,
                each.dosis_recibidas
              )
          );
        const query = pgp.helpers.insert(array, cs) + 'RETURNING id';
        return db.many(query);
      } catch (error) {
        console.log('error escribiendo archivo', error);
        return;
      }
    })
    .catch((error: any) => {
      console.log('error while getting vaccines', error);
      return 'ERROR';
    });
};
