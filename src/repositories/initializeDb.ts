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
  vaccine_lot varchar(150))`;

const getDoseDistributionCountVieQuery = `CREATE MATERIALIZED VIEW IF NOT EXISTS dose_count AS (
  SELECT dose_order, COUNT(*) AS totalByDose
                                FROM vaccine_applications
                                WHERE age_group != 'S.I.'
                                GROUP BY dose_order)`;

const getDoseDistributionByAgeGroupViewQuery = `CREATE MATERIALIZED VIEW IF NOT EXISTS vaccines_applications_by_dose_and_age AS
(
WITH vaccines_by_dose_and_age AS (
         SELECT age_group, dose_order, vaccine, sex, COUNT(*)
         FROM vaccine_applications
         WHERE age_group != 'S.I.'
         GROUP BY age_group, dose_order, vaccine, sex
     )
SELECT age_group, vda.dose_order, vda.vaccine, vda.sex, vda.count
FROM vaccines_by_dose_and_age vda
ORDER BY age_group)`;

const totalApplicationsViewQuery = `CREATE MATERIALIZED VIEW IF NOT EXISTS total_applications AS
(
SELECT COUNT(*) as totalApplications
from vaccine_applications)`;

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

const dailyApplicationsViewQuery = `CREATE MATERIALIZED VIEW IF NOT EXISTS daily_applications_by_vaccine AS
(
SELECT vaccine, application_date, COUNT(*)
FROM vaccine_applications
WHERE application_date IS NOT NULL
GROUP BY application_date, vaccine
ORDER BY application_date)`;

const applicationByPlaceViewQuery = `CREATE MATERIALIZED VIEW IF NOT EXISTS applications_by_place AS
(
SELECT age_group,
       dose_order,
       application_department,
       application_jurisdiction,
       vaccine,
       sex,
       COUNT(*) as applications
FROM vaccine_applications
WHERE age_group != 'S.I.'
GROUP BY age_group, dose_order, application_department, application_jurisdiction, vaccine, sex
ORDER BY age_group)`;

const applicationsConditionByPlaceViewQuery = `CREATE MATERIALIZED VIEW IF NOT EXISTS applications_conditions_by_place AS
(
SELECT 
       application_jurisdiction,
       application_condition,
       age_group,
       COUNT(*)
FROM vaccine_applications
GROUP BY application_jurisdiction, application_condition, age_group
ORDER BY application_jurisdiction)`;

const materializedViews = [
  'total_applications',
  'total_applications_by_vaccine_and_dose',
  'vaccines_applications_by_dose_and_age',
  'dose_count',
  'daily_applications_by_vaccine',
  'applications_by_place',
  'applications_conditions_by_place',
];

const refreshMatView = (view: String) => `REFRESH MATERIALIZED VIEW ${view}`;

export const refreshViewsQueries = () =>
  materializedViews.map((view) => refreshMatView(view));

export default [
  createTablesQuery,
  getDoseDistributionByAgeGroupViewQuery,
  totalApplicationsViewQuery,
  totalApplicationsByVaccineAndDoseViewQuery,
  getDoseDistributionCountVieQuery,
  dailyApplicationsViewQuery,
  applicationByPlaceViewQuery,
  applicationsConditionByPlaceViewQuery,
];
