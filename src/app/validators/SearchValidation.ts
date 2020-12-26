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
		if (!validator.isInt(value, { min: 0 })) {
			this.errors.push(new Error(constants.INT_TYPE_ERROR(property, 'number')));
			return false;
		}

		return true;
	}

	validateOrderBy(value: any) {
		if (value && value != constants.NAME && value != constants.DATELASTEDITED) {
			this.errors.push(new Error(constants.ORDERBY_TYPE_ERROR(value)));
			return false;
		}

		return true;
	}

	validateOrderDirection(value: any) {
		if (value && value != constants.ORDERBYDIRECTIONASC && value != constants.ORDERBYDIRECTIONDESC) {
			this.errors.push(new Error(constants.ORDERDIRECTION_TYPE_ERROR(value)));
			return false;
		}
		
		return true;
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

	validateSearchRequest(searchparams: any) {
		this.errors = [];
		for (let key in searchparams) {
			this.validateSearchRequestProperties(key, (searchparams as any)[key]);
		}

		if (this.errors.length > 0) {
			 let error = this.errors.map(e => e.message)
			 throw error;
		}

		return true;
	}
}