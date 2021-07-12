import { IDatabase } from 'pg-promise';
import Repositories from './repositories/repositories';
import Services from './services/services';
import initilizeDbQueries from './repositories/initializeDb';
import { registerEndpoints } from './endpoints';
import { registerCrons } from './crons';

const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = 8000;

const initializeDb = (db: IDatabase<any>) => {
  return initilizeDbQueries.map((query: string) => db.none(query));
};

const start = async (db: IDatabase<any>) => {
  console.log('initializing database if needed');
  await Promise.all(initializeDb(db));

  const repositories = Repositories(db);
  const services = Services(repositories);

  registerEndpoints(app, services);

  registerCrons(db);

  app.listen(PORT, async () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    // await syncData(db);
  });
};

const databaseConfig = {
  host: 'localhost',
  port: 5432,
  database: 'infovis',
  user: 'postgres',
};

const pgp = require('pg-promise')({});

pgp(databaseConfig)
  .connect()
  .then((db: IDatabase<any>) => start(db))
  .catch((error: any) =>
    console.log('There was an error connecting to the db', error)
  );
