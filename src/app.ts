import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { SearchController } from './app/controllers/SearchController';
import { CreateSchema } from './app/utils/CreateSchema';
import pgPromise from 'pg-promise';
import { Logger } from 'tslog';
import { Dependencies } from './app/types/dependencies';
import { exceptionHandler } from './app/middlewares/exception-handler';
import * as dotenv from 'dotenv';

export class Server {
	private readonly app: Application;
	private readonly options: any = {
		"origin": "*",
		"methods": "GET",
		"preflightContinue": false,
		"optionsSuccessStatus": 204
	  }

	constructor() {
		this.app = express();
		this.setupBodyParser();
		const pgPromiseClient = Server.createPgPromise();
		const databaseConnection = Server.createDbConnection(pgPromiseClient);
		const log: Logger = new Logger();
		const dependencies = Server.initializeDependencies(pgPromiseClient, databaseConnection, log);
		const createSchema = new CreateSchema(this.app, dependencies);
		const searchcontroller = new SearchController(this.app, dependencies);
		//this.app.use(exceptionHandler); // Middleware function to log the exception.
	}

	private setupBodyParser(): void {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
	}

	private static initializeDependencies(
		pgPromiseClient: pgPromise.IMain,
		databaseConnection: pgPromise.IDatabase<{}>, log: Logger,
	): Dependencies {
		const dependencies: Dependencies = new Dependencies();
		dependencies.databaseConfig = databaseConnection;
		dependencies.PGP = pgPromiseClient;
		dependencies.logger = log;
		return dependencies;
	}

	private static createPgPromise(): pgPromise.IMain {
		const pgPromiseInitOptions = {
			connect(client: any): void {
				const cp = client.connectionParameters;
				console.log(`PGP: Connected to database - ${cp.database}`);
			},
			disconnect(client: any): void {
				const cp = client.connectionParameters;
				console.log(`PGP: Disconnecting from database - ${cp.database}`);
			},
			error(err: any, e: any): void {
				console.log(`PGP: Error - ${err}`);
			},
			query(e: any): void {
				console.log(`QUERY: ${e.query}`);
			},
			promiseLib: Promise,
			noLocking: true,
		};
		const pgPromiseClient = pgPromise(pgPromiseInitOptions);
		return pgPromiseClient;
	}

	private static createDbConnection(pgPromiseClient: pgPromise.IMain): pgPromise.IDatabase<{}> {
		const dbUri = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
		pgPromiseClient.pg.types.setTypeParser(20, parseInt);
		const database = pgPromiseClient(dbUri);
		database.connect()
			.catch(err => err);
		return database;
	}

	public async start(port: number): Promise<number> {
		return new Promise((fulfill, reject) => {
		  this.app.listen(port, () => {
			fulfill(port);
		  })
			.on('error', reject);
		});
	  }
}

dotenv.config();
const PORT: number = Number(process.env.PORT);
const server = new Server();

server.start(PORT)
	.then(port => { console.log(`Server is running at http://localhost:${PORT}`); })
	.catch(error => { console.log(error); });
