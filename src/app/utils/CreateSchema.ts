
import { Dependencies } from '../types/dependencies';
import express from 'express';
import * as createQueries from '../db/create-sql';
import * as fs from 'fs';
import * as util from 'util';


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

	public async createSchemaAndTables() {

		const tablename = createQueries.getTableName('table_search', 'SearchApp', this.pgp);
		const cs = createQueries.getInsertColumnSet(this.pgp, tablename);
		const dataMulti = [{ name: 123, imageurl: 'hello' }, { name: 456, imageurl: 'world!' }];
		const readFile = util.promisify(fs.readFile);
		const filejson = await readFile('mockdata.json', 'utf8');

		return await this.databaseObject.tx('create schema, table and data', (tx: any) =>
			tx.batch([
				tx.none(createQueries.createSchema('SearchApp')),
				tx.none(createQueries.createSearchTable(tablename)),
				tx.none(createQueries.createTSVectorTrigger(tablename)),
				tx.none(createQueries.createSearchIndex(tablename)),	
				tx.none(createQueries.deleteSearchData(tablename)),	
				tx.none(this.pgp.helpers.insert(JSON.parse(filejson), cs))
			]));
	};
}

