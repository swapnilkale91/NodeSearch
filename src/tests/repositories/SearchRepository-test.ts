import chai from 'chai';
import * as sinon from 'sinon';
import express, { Application } from 'express';
import * as searchQueries from '../../app/db/search-sql';
import * as createQueries from '../../app/db/create-sql';
import { SearchRepository } from '../../app/repositories/SearchRepository';
import { SearchService } from '../../app/services/SearchService';
import { Dependencies } from '../../app/types/dependencies';
import { SearchParamsDTO } from 'common';
import pgPromise from 'pg-promise';

const dependencies = new Dependencies();
let createsqlStub: any;
let searchsqlStub: any;

describe('Testing the Search Service ', () => {
	beforeEach(done => {
		createsqlStub = sinon.stub(createQueries, 'getTableName');
		searchsqlStub = sinon.stub(searchQueries, 'searchQuery');
		const db = { any: sinon.stub().returns([]) };
		const pgp = { any: sinon.stub().returns([]) };
		dependencies.databaseConfig = db;
		dependencies.PGP = pgp;
		done();
	});
	afterEach(done => {
		createsqlStub.restore();
		searchsqlStub.restore();
		done();
	});
	it('should fetch from the database', () => {
		const searchparams: SearchParamsDTO = { search: 'doleres', itemsperpage: 6, orderby: 'id', pagenumber: 3, offset: 12 };
		const response = new SearchRepository(dependencies).getSearch(searchparams);
		searchsqlStub.resolves([]);
		createsqlStub.resolves(`"SearchApp"."table_search"`);
		sinon.assert.calledOnce(createsqlStub);
		sinon.assert.calledOnce(searchsqlStub);
	})
})