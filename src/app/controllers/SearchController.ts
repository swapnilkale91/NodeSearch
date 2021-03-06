import { SearchService } from '../services/SearchService';
import { Dependencies } from '../types/dependencies';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { SearchValidation } from '../validators/SearchValidation';

export class SearchController {

	private readonly searchService: SearchService;
	private readonly searchvalidation: SearchValidation;
	private readonly app: express.Application;

	constructor(app: express.Application, dependencies: Dependencies) {
		this.app = app;
		this.searchService = new SearchService(dependencies);
		this.getSearch = this.getSearch.bind(this);
		this.searchvalidation = new SearchValidation();
		this.registerRoutes();
	}

	public registerRoutes(): void {
		this.app.route('/search')
			.get(this.getSearch);
	}

	public async getSearch(req: express.Request, res: express.Response): Promise<any> {
		try {
			this.searchvalidation.validateSearchRequest(req.query);
			const output = await this.searchService.getSearch(req.query);
			const totalCount = output[0] ? output[0].totalcount : 0;
			output.map((value: any) => delete value.totalcount);
			const finaloutput = { 'data': output, 'totalcount': totalCount };
			res.status(StatusCodes.OK).send(finaloutput);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
		}
	}
}

