import { VaccineApplication } from '../model/vaccineApplication';

const csv = require('csv-parser');
const fs = require('fs');

const parseCsv = async (): Promise<Array<VaccineApplication>> => {
  const objectArray: Array<VaccineApplication> = [];
  await fs
    .createReadStream(
      '' +
        process.env.ZIP_EXTRACT_FOLDER +
        process.env.DEFAULT_FILE_NAME_VACCINE_APPLICATIONS
    )
    .pipe(csv())
    .on(
      'data',
      ({
        sexo,
        grupo_etario,
        jurisdiccion_residencia,
        jurisdiccion_residencia_id,
        depto_residencia,
        depto_residencia_id,
        jurisdiccion_aplicacion,
        jurisdiccion_aplicacion_id,
        depto_aplicacion,
        depto_aplicacion_id,
        fecha_aplicacion,
        vacuna,
        condicion_aplicacion,
        orden_dosis,
        lote_vacuna,
      }: any) => {
        console.log('Guardando');
        objectArray.push(
          new VaccineApplication(
            sexo,
            grupo_etario,
            jurisdiccion_residencia,
            jurisdiccion_residencia_id,
            depto_residencia,
            depto_residencia_id,
            jurisdiccion_aplicacion,
            jurisdiccion_aplicacion_id,
            depto_aplicacion,
            depto_aplicacion_id,
            fecha_aplicacion,
            vacuna,
            condicion_aplicacion,
            orden_dosis,
            lote_vacuna
          )
        );
      }
    )
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
  return objectArray;
};
export const readCsvAndPersist = async (db: any) => {
  const objectArray: Array<VaccineApplication> = await parseCsv();
  console.log('About to insert', objectArray.length);
  objectArray.map(
    async ({
      sex,
      ageGroup,
      residenceJurisdiction,
      residenceJurisdictionId,
      residenceDepartment,
      residenceDepartmentId,
      applicationJurisdiction,
      applicationJurisdictionId,
      applicationDepartment,
      applicationDepartmentId,
      applicationDate,
      vaccine,
      applicationCondition,
      doseOrder,
      vaccineLot,
    }) =>
      await db.query(`INSERT INTO vaccine_applications VALUES(${sex}, ${ageGroup}, ${residenceJurisdiction},
      ${residenceJurisdictionId},
      ${residenceDepartment},
      ${residenceDepartmentId},
      ${applicationJurisdiction},
      ${applicationJurisdictionId},
      ${applicationDepartment},
      ${applicationDepartmentId},
      ${applicationDate},
      ${vaccine},
      ${applicationCondition},
      ${doseOrder},
      ${vaccineLot})`)
  );
  console.log('Finish insert');
};
