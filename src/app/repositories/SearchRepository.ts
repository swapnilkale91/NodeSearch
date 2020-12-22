import { Dependencies } from '../types/dependencies';
import * as searchQueries from '../db/search-sql';
import * as createQueries from '../db/create-sql';

export class SearchRepository {
	private readonly databaseObject: any;
	private readonly pgp: any;

	constructor(dependencies: Dependencies) {
		this.databaseObject = dependencies.databaseConfig;
		this.pgp = dependencies.PGP;
	}

	public async getSearch(search: string, itemsperpage: string, pagenumber: string, orderBy: string) {
		const tablename = createQueries.getTableName('table_search', 'SearchApp', this.pgp);
		const offset = (Number(pagenumber) - 1) * Number(itemsperpage); 
		return this.databaseObject.any(searchQueries.searchQuery(search, itemsperpage, offset, orderBy, tablename));
	}
}
