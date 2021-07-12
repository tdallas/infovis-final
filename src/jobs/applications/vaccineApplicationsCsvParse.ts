import { VaccineApplication } from '../../models/vaccineApplication';
import { refreshViewsQueries } from '../../repositories/initializeDb';

const csv = require('csv-parser');
const fs = require('fs');
const pgp = require('pg-promise')({
  /* initialization options */
  capSQL: true, // capitalize all generated SQL
});

const BATCH_AMOUNT = 50000;

const cs = new pgp.helpers.ColumnSet(
  [
    'id',
    'sex',
    'age_group',
    'residence_jurisdiction',
    'residence_jurisdiction_id',
    'residence_department',
    'residence_department_id',
    'application_jurisdiction',
    'application_jurisdiction_id',
    'application_department',
    'application_department_id',
    'application_date',
    'vaccine',
    'application_condition',
    'dose_order',
    'vaccine_lot',
  ],
  { table: 'vaccine_applications' }
);

const parseCsv = async (db: any): Promise<any> => {
  var savings = 0;
  var array: Array<VaccineApplication> = [];
  console.log('Starting to process file');
  const promises: Array<Promise<any>> = [];
  return new Promise((resolve, reject) =>
    fs
      .createReadStream(
        '' +
          process.env.ZIP_EXTRACT_FOLDER +
          process.env.DEFAULT_FILE_NAME_VACCINE_APPLICATIONS
      )
      .pipe(csv())
      .on('data', (row: any) => {
        // console.log('savings', savings);
        array.push(
          new VaccineApplication(
            array.length + savings * BATCH_AMOUNT,
            row.sexo,
            row.grupo_etario,
            row.jurisdiccion_residencia,
            row.jurisdiccion_residencia_id,
            row.depto_residencia,
            row.depto_residencia_id,
            row.jurisdiccion_aplicacion,
            row.jurisdiccion_aplicacion_id,
            row.depto_aplicacion,
            row.depto_aplicacion_id,
            row.fecha_aplicacion,
            row.vacuna,
            row.condicion_aplicacion,
            row.orden_dosis,
            row.lote_vacuna
          )
        );
        if (array.length % BATCH_AMOUNT == 0) {
          savings++;
          console.log('incrementing savings variable', new Date(), savings);
          const query = pgp.helpers.insert(array, cs) + 'RETURNING id';
          array = [];
          try {
            promises.push(db.many(query));
          } catch (error) {
            console.log('there was an error inserting in db', error);
            return reject('ERRORASO');
          }
        }
      })
      .on('end', () => {
        console.log('CSV file and save successfully processed');
        console.log('Cantidad de promises', promises.length);
        if (array.length > 0) {
          const query = pgp.helpers.insert(array, cs) + 'RETURNING id';
          promises.push(db.many(query));
          array = [];
        }
        return resolve(Promise.all(promises));
      })
  );
};

export const readCsvAndPersist = async (db: any) => {
  return await parseCsv(db);
};
