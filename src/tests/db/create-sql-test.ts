import chai from 'chai';
const expect = chai.expect;
import * as queries from '../../app/db/create-sql';
import * as sinon from 'sinon';

describe('Testing the validation Service ', () => {

	it('should create table query', () => {
		const tablename = `"SearchApp"."table_search"`;
		const expectedresponse =  `CREATE TABLE IF NOT EXISTS "SearchApp"."table_search"`;
		const response = queries.createSearchTable(tablename);
		expect(response).to.contain(expectedresponse);
	})

 	it('should return create index query', () => {
		const tablename = `"SearchApp"."table_search"`;
		const expectedresponse =  `CREATE INDEX IF NOT EXISTS search_idx ON "SearchApp"."table_search" USING GIN (searchterms);`
		const response = queries.createSearchIndex(tablename);
		expect(response).to.equal(expectedresponse);
	})
	
	it('should return create schema query', () => {
		const expectedresponse =  `CREATE SCHEMA IF NOT EXISTS "SearchApp"`
		const response = queries.createSchema("SearchApp");
		expect(response).to.equal(expectedresponse);
	})

	it('should return delete data query', () => {
		const tablename = `"SearchApp"."table_search"`;
		const expectedresponse =  `DELETE FROM "SearchApp"."table_search";`
		const response = queries.deleteSearchData(tablename);
		expect(response).to.equal(expectedresponse);
	})
	
	it('should return trigger query', () => {
		const tablename = `"SearchApp"."table_search"`;
		const expectedresponse =  `DROP TRIGGER IF EXISTS tsvectorupdate on "SearchApp"."table_search";`;
		const response = queries.createTSVectorTrigger(tablename);
		expect(response).to.contain(expectedresponse);
	})
})