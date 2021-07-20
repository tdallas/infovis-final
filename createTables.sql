CREATE TABLE vaccine_applications(
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
);

CREATE TABLE vaccine_receptions(
    id SERIAL PRIMARY KEY,
    reception_date date,
    dosis_received integer
);

CREATE TABLE last_update(
    id SERIAL PRIMARY KEY,
    last_update date
);