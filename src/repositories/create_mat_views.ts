const getDoseDistributionByAgeGroupViewQuery = `CREATE MATERIALIZED VIEW vaccines_applications_by_dose_and_age AS
(
WITH vaccines_by_dose_order AS (SELECT dose_order, COUNT(*) AS totalByDose
                                FROM vaccine_applications
                                WHERE age_group != 'S.I.'
                                GROUP BY dose_order
),
     vaccines_by_dose_and_age AS (
         SELECT age_group, dose_order, COUNT(*)
         FROM vaccine_applications
         WHERE age_group != 'S.I.'
         GROUP BY age_group, dose_order
     )
SELECT age_group, vda.dose_order, vda.count, totalByDose
FROM vaccines_by_dose_and_age vda,
     vaccines_by_dose_order vb
WHERE vda.dose_order = vb.dose_order
    )
`;

const totalApplicationsViewQuery = `CREATE MATERIALIZED VIEW total_applications AS
(
SELECT COUNT(*) as totalApplications
from vaccine_applications)
`;

const totalApplicationsByVaccineAndDoseViewQuery = `CREATE MATERIALIZED VIEW total_applications AS
(
SELECT COUNT(*) as totalApplications
from vaccine_applications);

CREATE MATERIALIZED VIEW total_applications_by_vaccine_and_dose AS
(
WITH vaccine_applications_by_vaccine AS (
    SELECT vaccine, dose_order, count(*) as totalByVaccine
    FROM vaccine_applications
    GROUP BY vaccine, dose_order)
SELECT vaccine,
       dose_order,
       totalByVaccine,
       (totalByVaccine / totalApplications :: float) * 100 as percOfTotal
FROM vaccine_applications_by_vaccine,
     total_applications)`;
