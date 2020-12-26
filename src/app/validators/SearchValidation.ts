import * as constants from '../utils/constants';
import express from 'express';
import { NextFunction } from 'connect';
import validator from 'validator';

export class SearchValidation {

	private errors: Array<Error>;
	constructor() {
		this.errors = [];
	}

	validatePositiveInt(property: string, value: any) {
		if (!validator.isInt(value, { min: 0 }))
			this.errors.push(new Error(constants.INT_TYPE_ERROR(property, 'number')));
	}

	validateOrderBy(value: any) {
		if (value && value != constants.NAME && value != constants.DATELASTEDITED) {
			this.errors.push(new Error(constants.ORDERBY_TYPE_ERROR(value)));
		}
	}

	validateOrderDirection(value: any) {
		if (value && value != constants.ORDERBYDIRECTIONASC && value != constants.ORDERBYDIRECTIONDESC) {
			this.errors.push(new Error(constants.ORDERDIRECTION_TYPE_ERROR(value)));
		}
	}

	public validateSearchRequestProperties(property: any, value: any) {
		switch (property) {
			case constants.ITEMSPERPAGE:
				this.validatePositiveInt(constants.ITEMSPERPAGE, value);
				break;
			case constants.PAGENUMBER:
				this.validatePositiveInt(constants.PAGENUMBER, value);
				break;
			case constants.SEARCH:
				break;
			case constants.ORDERBY:
				this.validateOrderBy(value);
				break;
			case constants.ORDERDIRECTION:
				this.validateOrderDirection(value);
				break;
			default: this.errors.push(new Error(constants.INVALID_PROP(property)));
		}
	}

	validateSearchRequest(req: express.Request, res: express.Response, next: NextFunction) {
		this.errors = [];
		for (let key in req.query) {
			this.validateSearchRequestProperties(key, (req.query as any)[key]);
		}

		if (this.errors.length > 0) {
			res.status(400).json({ errors: this.errors.map(e => e.message) });
		} else {
			next();
		}

	}
}