import * as constants from '../utils/constants';
import { SearchParamsDTO } from '../types/common'

export class SearchValidation {

	private errors: Array<Error>;
	constructor() {
		this.errors = [];
	}

	public validateSearchRequestProperties(property: any, value: any) {
		switch (property) {
			case constants.PAGE_SIZE:
				break;
			case constants.OFFSET:
				break;
			case constants.SEARCH:
				break;
			case constants.ORDERBY:
				break;
			default: this.errors.push(new URIError(constants.INVALID_PROP(property)));
		}
	}

	validateSearchRequest(searchParams: SearchParamsDTO) {
		this.errors = [];
		for (const attr in searchParams) {
			this.validateSearchRequestProperties(attr, (searchParams as any)[attr]);
		}

		return this.errors.map(error => error.message);
	}
}