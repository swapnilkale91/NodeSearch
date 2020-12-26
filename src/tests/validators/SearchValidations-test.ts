import chai from 'chai';
const expect = chai.expect;
const assert = chai.assert;
import { SearchValidation } from '../../app/validators/SearchValidation';
import * as constants from '../../app/utils/constants';
import * as sinon from 'sinon';

describe('Testing the validation Service ', () => {

	it('should validatePositiveInt function should return true', () => {
		const response = new SearchValidation().validatePositiveInt(constants.ITEMSPERPAGE, '1');
		expect(response).to.equal(true);
	})

	it('should validatePositiveInt function should return false', () => {
		const response = new SearchValidation().validatePositiveInt(constants.ITEMSPERPAGE, '-1');
		expect(response).to.equal(false);
	})

	it('should validateOrderBy function should return true', () => {
		const response = new SearchValidation().validateOrderBy(constants.NAME);
		expect(response).to.equal(true);
	})

	it('should validateOrderBy function should return false', () => {
		const response = new SearchValidation().validateOrderBy(constants.ITEMSPERPAGE);
		expect(response).to.equal(false);
	})

	it('should validateOrderDirection function should return true', () => {
		const response = new SearchValidation().validateOrderDirection(constants.ORDERBYDIRECTIONASC);
		expect(response).to.equal(true);
	})

	it('should validateOrderDirection function should return false', () => {
		const response = new SearchValidation().validateOrderDirection(constants.ITEMSPERPAGE);
		expect(response).to.equal(false);
	})

	it('should call validatePositiveInt while validating itemsperpage', () => {
		const spyOnvalidatePositiveInt: any = sinon.spy(SearchValidation.prototype, 'validatePositiveInt');
		const response = new SearchValidation().validateSearchRequestProperties(constants.ITEMSPERPAGE, "1");
		sinon.assert.calledOnce(spyOnvalidatePositiveInt);
		spyOnvalidatePositiveInt.restore();
	})

	it('should call validatePositiveInt while validating page number', () => {
		const spyOnvalidatePositiveInt: any = sinon.spy(SearchValidation.prototype, 'validatePositiveInt');
		const response = new SearchValidation().validateSearchRequestProperties(constants.PAGENUMBER, "1");
		sinon.assert.calledOnce(spyOnvalidatePositiveInt);
		spyOnvalidatePositiveInt.restore();
	})

	it('should call validatePositiveInt while validating validateSearchRequestProperties - Order by', () => {
		const spyOnvalidateOrderBy: any = sinon.spy(SearchValidation.prototype, 'validateOrderBy');
		const response = new SearchValidation().validateSearchRequestProperties(constants.ORDERBY, constants.NAME);
		sinon.assert.calledOnce(spyOnvalidateOrderBy);
		spyOnvalidateOrderBy.restore();
	})

	it('should call validatePositiveInt while validating validateSearchRequestProperties - ORDER DIRECTION', () => {
		const spyOnvalidateOrderDirection: any = sinon.spy(SearchValidation.prototype, 'validateOrderDirection');
		const response = new SearchValidation().validateSearchRequestProperties(constants.ORDERDIRECTION, constants.ORDERBYDIRECTIONASC);
		sinon.assert.calledOnce(spyOnvalidateOrderDirection);
		spyOnvalidateOrderDirection.restore();
	})
})