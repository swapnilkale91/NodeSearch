import SearchService from '../services/SearchService';
import { Dependencies } from '../types/dependencies';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { SearchValidation } from '../validators/SearchValidation.js';
import { SearchParamsDTO } from 'common';

export class SearchController {

	private readonly searchService: SearchService;
	private readonly searchvalidation: SearchValidation;
	private readonly app: express.Application;

	constructor(app: express.Application, dependencies: Dependencies) {
		this.app = app;
		this.searchService = new SearchService(dependencies);
		this.searchResults = this.searchResults.bind(this);
		this.searchvalidation = new SearchValidation();
		this.registerRoutes();
	}

	public registerRoutes(): void {
		this.app.route('/search')
			.get(this.searchResults);
	}

	public async searchResults(req: express.Request, res: express.Response): Promise<any> {
		const search: any = req.query.search;
		const itemsperpage: any = req.query.itemsperpage; // 6
		const pagenumber: any = req.query.pagenumber;
		const orderBy: any = req.query.orderby;

		try {
			this.searchvalidation.validateSearchRequest(req.query);
			const output = await this.searchService.getSearch(search, itemsperpage, pagenumber, orderBy);
			const totalCount = output[0].totalcount;
			output.map((value: any) => delete value.totalcount);
			res.setHeader('totalCount', totalCount);
			res.status(StatusCodes.OK).send(output);
		} catch (err) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
		}
	}
}

