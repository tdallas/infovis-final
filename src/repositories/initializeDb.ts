const createTablesQuery = `CREATE TABLE IF NOT EXISTS vaccine_applications(
  id SERIAL PRIMARY KEY,
  sex varchar(50),
  age_group varchar(100),
  residence_jurisdiction varchar(100),
  residence_jurisdiction_id integer,
  residence_department varchar(150),
  residence_department_id integer,
  application_jurisdiction varchar(150),
  application_jurisdiction_id integer,
  application_department varchar(150),
  application_department_id integer,
  application_date date,
  vaccine varchar(150),
  application_condition varchar(150),
  dose_order integer,
  vaccine_lot varchar(150)
)`;

const getDoseDistributionByAgeGroupViewQuery = `CREATE MATERIALIZED VIEW IF NOT EXISTS vaccines_applications_by_dose_and_age AS
(
WITH vaccines_by_dose_order AS (SELECT dose_order, vaccine, sex, COUNT(*) AS totalByDose
                                FROM vaccine_applications
                                WHERE age_group != 'S.I.'
                                GROUP BY dose_order, vaccine, sex
),
     vaccines_by_dose_and_age AS (
         SELECT age_group, dose_order, vaccine, sex, COUNT(*)
         FROM vaccine_applications
         WHERE age_group != 'S.I.'
         GROUP BY age_group, dose_order, vaccine, sex
     )
SELECT age_group, vda.dose_order, vda.vaccine, vda.sex, vda.count, totalByDose
FROM vaccines_by_dose_and_age vda,
     vaccines_by_dose_order vb
WHERE vda.dose_order = vb.dose_order
    )
`;

const totalApplicationsViewQuery = `CREATE MATERIALIZED VIEW IF NOT EXISTS total_applications AS
(
SELECT COUNT(*) as totalApplications
from vaccine_applications)
`;

const totalApplicationsByVaccineAndDoseViewQuery = `CREATE MATERIALIZED VIEW IF NOT EXISTS total_applications_by_vaccine_and_dose AS
(
WITH vaccine_applications_by_vaccine AS (
    SELECT vaccine, dose_order, COUNT(*) as totalByVaccine
    FROM vaccine_applications
    GROUP BY vaccine, dose_order)
SELECT vaccine,
       dose_order,
       totalByVaccine,
       (totalByVaccine / totalApplications :: float) * 100 as percOfTotal
FROM vaccine_applications_by_vaccine,
     total_applications)`;

const materializedViews = [
  'total_applications',
  'total_applications_by_vaccine_and_dose',
  'vaccines_applications_by_dose_and_age',
];

const refreshMatView = (view: String) => `REFRESH MATERIALIZED VIEW ${view}`;

export const refreshViewsQueries = () =>
  materializedViews.map((view) => refreshMatView(view));

export default [
  createTablesQuery,
  getDoseDistributionByAgeGroupViewQuery,
  totalApplicationsViewQuery,
  totalApplicationsByVaccineAndDoseViewQuery,
];
