export const getDoseDistributionByAgeGroupQuery = `CREATE MATERIALIZED VIEW vaccines_applications_by_dose_and_age AS
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
