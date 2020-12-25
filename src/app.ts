import express from 'express';
import bodyParser from 'body-parser';
import { SearchController } from './app/controllers/SearchController';
import { CreateSchema } from './app/utils/CreateSchema';
import * as dbUtils from './app/utils/DbUtils'
import { Logger } from 'tslog';
import { Dependencies } from './app/types/dependencies';
import * as dotenv from 'dotenv';

dotenv.config();

/* Express configurations */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);

/* Setting Dependencies */
const pgPromiseClient = dbUtils.createPgPromise();
const databaseConnection = dbUtils.createDbConnection(pgPromiseClient);
const log: Logger = new Logger();
const dependencies: Dependencies = new Dependencies();
dependencies.databaseConfig = databaseConnection;
dependencies.PGP = pgPromiseClient;
dependencies.logger = log;

/* Setting Routes */
const createSchema = new CreateSchema(app, dependencies);
const searchcontroller = new SearchController(app, dependencies);

/* Setting Routes */
export default app;