CREATE TABLE vaccine_applications(
    id SERIAL PRIMARY KEY,
    sex varchar(50),
    ageGroup varchar(100),
    residenceJurisdiction varchar(100),
    residenceJurisdictionId integer,
    residenceDepartment varchar(150),
    residenceDepartmentId integer,
    applicationJurisdiction varchar(150),
    applicationJurisdictionId integer,
    applicationDepartment varchar(150),
    applicationDepartmentId integer,
    applicationDate date,
    vaccine varchar(150),
    applicationCondition varchar(150),
    doseOrder integer,
    vaccineLot varchar(150)
);