import chai from 'chai';
import * as sinon from 'sinon';
import express, { Application } from 'express';
import { SearchRepository } from '../../app/repositories/SearchRepository';
import { SearchService } from '../../app/services/SearchService';
import { Dependencies } from '../../app/types/dependencies';
import { SearchParamsDTO } from 'common';

const app = express();
const dependencies = new Dependencies();
const expect = chai.expect;
let searchrepostub: any;

describe('Testing the Search Service ', () => {
	beforeEach(done => {
		searchrepostub = sinon.stub(SearchRepository.prototype, 'getSearch');
		done();
	});
	afterEach(done => {
		searchrepostub.restore();
		done();
	});
	it('should calculate offset from pagenumber and itemsperpage', () => {
		const searchparams: SearchParamsDTO =  { itemsperpage: 6, orderby: 'id', pagenumber: 3 };
		const searchparamscalled: SearchParamsDTO =  { itemsperpage: 6, orderby: 'id', pagenumber: 3, offset: 12 };
		searchrepostub.resolves([]);
		const response = new SearchService(dependencies).getSearch(searchparams);
		sinon.assert.calledOnce(searchrepostub);
        sinon.assert.calledWith(searchrepostub, searchparamscalled);
	})
})