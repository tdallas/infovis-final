import { IDatabase } from 'pg-promise';

export interface VaccineApplicationsRepository {}

const configure = (db: IDatabase<any>): VaccineApplicationsRepository => ({});

export default configure;
