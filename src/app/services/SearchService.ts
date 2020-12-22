import { SearchRepository } from '../repositories/SearchRepository';
import { Dependencies } from '../types/dependencies';

export default class SearchService {

	private readonly searchRepository: SearchRepository;

	constructor(dependencies: Dependencies) {
		this.searchRepository = new SearchRepository(dependencies);
	}

	public async getSearch(search: string, page: string, size: string) {
		return this.searchRepository.getSearch(search, page, size);
	}
}
