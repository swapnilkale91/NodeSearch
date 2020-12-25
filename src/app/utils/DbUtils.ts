import pgPromise from 'pg-promise';

export let createPgPromise = (): pgPromise.IMain => {
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

export let createDbConnection = (pgPromiseClient: pgPromise.IMain): pgPromise.IDatabase<{}> => {
	const dbUri = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
	pgPromiseClient.pg.types.setTypeParser(20, parseInt);
	const database = pgPromiseClient(dbUri);
	database.connect()
		.catch(err => err);
	return database;
}