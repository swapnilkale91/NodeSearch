import { Dependencies } from '../types/dependencies';

export class SearchRepository {
	private readonly databaseObject: any;
	private readonly pgp: any;

	constructor(dependencies: Dependencies) {
		this.databaseObject = dependencies.databaseConfig;
		this.pgp = dependencies.PGP;
	}

	public async getSearch(search: string, page: string, size: string) {
		return this.databaseObject.one('select now()');
	}
}
