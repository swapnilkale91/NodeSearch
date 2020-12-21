import { Dependencies } from '../types/dependencies';

export class SearchRepository {
	private readonly databaseObject: any;
	private readonly pgp: any;

	constructor(dependencies: Dependencies) {
		this.databaseObject = dependencies.databaseConfig;
		this.pgp = dependencies.PGP;
	}

	public async getSearch() {
		return this.databaseObject.one('select now()');
	}
}
