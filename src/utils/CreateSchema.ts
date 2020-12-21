
import { Dependencies } from '../types/dependencies';
import express from 'express';
import * as createQueries from '../db/create-sql';
import { StatusCodes } from 'http-status-codes';

export class CreateSchema {

	private readonly databaseObject: any;
	private readonly app: express.Application;
	private readonly pgp: any;

	constructor(app: express.Application, dependencies: Dependencies) {
		this.app = app;
		this.pgp = dependencies.PGP;
		this.databaseObject = dependencies.databaseConfig;
		this.createSchemaAndTables();
	}

	private readonly getTableName = (tablename: string, schemaname: string) =>
		new this.pgp.helpers.TableName({ table: tablename, schema: schemaname });

	public async createSchemaAndTables() {
		return await this.databaseObject.tx('create schema and table', (tx: any) =>
			tx.batch([
				tx.none(createQueries.createSchema('SearchApp')),
				tx.none(createQueries.createSearchTable(this.getTableName('table_search', 'SearchApp'),))
			]))
	};
}

