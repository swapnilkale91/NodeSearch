import SearchService from '../services/SearchService';
import { Dependencies } from '../types/dependencies';
import express from 'express';
import { StatusCodes } from 'http-status-codes';

export class SearchController {

	private readonly searchService: SearchService;
    private readonly app: express.Application;

	constructor(app: express.Application, dependencies: Dependencies) {
		this.app = app;
		this.searchService = new SearchService(dependencies);
		this.searchAlerts = this.searchAlerts.bind(this);
		this.registerRoutes();
	}

	public registerRoutes(): void {
		this.app.route('/search')
			.get(this.searchAlerts);
	}

	public async searchAlerts(req: express.Request, res: express.Response): Promise<any> {
		const search: string = req.params.search;
		const page: string = req.params.page;
		const size: string = req.params.size;
		try {
			const output = await this.searchService.getSearch(search, page, size);
			res.status(StatusCodes.OK).send(output);
		} catch (err) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
		}
	}
}

