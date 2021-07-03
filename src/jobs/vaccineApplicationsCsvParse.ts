import { VaccineApplication } from '../model/vaccineApplication';

const csv = require('csv-parser');
const fs = require('fs');
const pgp = require('pg-promise')({
  /* initialization options */
  capSQL: true, // capitalize all generated SQL
});

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

const parseCsv = async (db: any): Promise<Array<VaccineApplication>> => {
  var savings = 0;
  var array: Array<VaccineApplication> = [];
  console.log('Starting to process file');
  return await fs
    .createReadStream(
      '' +
        process.env.ZIP_EXTRACT_FOLDER +
        process.env.DEFAULT_FILE_NAME_VACCINE_APPLICATIONS
    )
    .pipe(csv())
    .on('data', async (row: any) => {
      array.push(
        new VaccineApplication(
          array.length + savings * 10000,
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
      if (array.length % 10000 == 0) {
        const query = pgp.helpers.insert(array, cs);
        await db.none(query);
        savings++;
        array = [];
        console.log(await db.any('SELECT COUNT(*) FROM vaccine_applications'));
      }
    })
    .on('end', async () => {
      console.log('CSV file and save successfully processed');
      const query = pgp.helpers.insert(array, cs);
      await db.none(query);
    });
};

export const readCsvAndPersist = async (db: any) => {
  return parseCsv(db);
};
