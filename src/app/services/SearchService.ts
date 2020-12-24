import { SearchRepository } from '../repositories/SearchRepository';
import { Dependencies } from '../types/dependencies';
import { SearchParamsDTO } from 'common';

export class SearchService {

	private readonly searchRepository: SearchRepository;

	constructor(dependencies: Dependencies) {
		this.searchRepository = new SearchRepository(dependencies);
	}

	public async getSearch(searchparams: SearchParamsDTO) {
		if (searchparams.pagenumber && searchparams.itemsperpage) {
			searchparams.offset = (searchparams.pagenumber - 1) * searchparams.itemsperpage;
		}

		return this.searchRepository.getSearch(searchparams);
	}
}

