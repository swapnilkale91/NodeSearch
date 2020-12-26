import { Dependencies } from '../types/dependencies';
import * as searchQueries from '../db/search-sql';
import * as createQueries from '../db/create-sql';
import * as CONSTANTS from '../utils/constants';
import { SearchParamsDTO } from 'common';

export class SearchRepository {
	private readonly databaseObject: any;
	private readonly pgp: any;

	constructor(dependencies: Dependencies) {
		this.databaseObject = dependencies.databaseConfig;
		this.pgp = dependencies.PGP;
	}

	public async getSearch(searchparams: SearchParamsDTO) {
		const tablename = createQueries.getTableName(CONSTANTS.SEARCH_TABLE_NAME, CONSTANTS.SEARCH_SCHEMA_NAME, this.pgp);
		return this.databaseObject.any(searchQueries.searchQuery(searchparams, tablename, this.pgp));
	}
}
