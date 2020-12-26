import chai from 'chai';
const expect = chai.expect;
import * as queries from '../../app/db/search-sql';
import * as sinon from 'sinon';
import { SearchParamsDTO } from 'common';

describe('Testing the validation Service ', () => {

	it('should return search query when search value is not passed', () => {
		const searchparams: SearchParamsDTO = {
			search: '',
			orderby: 'name',
			orderdirection: 'asc',
			itemsperpage: 6,
			pagenumber: 1,
			offset: 0
		}

		const query = `select id, name, imageurl, description, count(*) OVER() AS totalCount\n\t\t\t\t from "SearchApp"."table_search" order by "name" asc limit 6 offset 0`
		const pgp = { any: sinon.stub().returns([]) };
		const tablename = `"SearchApp"."table_search"`;
		const response = queries.searchQuery(searchparams, tablename, pgp);
		expect(response).to.equal(query);
	})

	it('should return search query when search value is not passed and without orderby and limit values', () => {
		const searchparams: SearchParamsDTO = {}

		const query = `select id, name, imageurl, description, count(*) OVER() AS totalCount\n\t\t\t\t from "SearchApp"."table_search"`
		const pgp = { any: sinon.stub().returns([]) };
		const tablename = `"SearchApp"."table_search"`;
		const response = queries.searchQuery(searchparams, tablename, pgp);
		expect(response).to.equal(query);
	})

	it('should return search query when search value is not passed and with orderby but without order direction', () => {
		const searchparams: SearchParamsDTO = {orderby: 'name'}

		const query = `select id, name, imageurl, description, count(*) OVER() AS totalCount\n\t\t\t\t from "SearchApp"."table_search" order by "name" asc`
		const pgp = { any: sinon.stub().returns([]) };
		const tablename = `"SearchApp"."table_search"`;
		const response = queries.searchQuery(searchparams, tablename, pgp);
		expect(response).to.equal(query);
	})


	it('should return search with to_tsquery when search value is passed without quotes', () => {
		const searchparams: SearchParamsDTO = {
			search: 'the king',
			orderby: 'name',
			orderdirection: 'asc',
			itemsperpage: 6,
			pagenumber: 1,
			offset: 0
		}

		const query = `select id, name, imageurl, description, count(*) OVER() AS totalCount\n\t\t\t\t from "SearchApp"."table_search" where  searchterms @@ to_tsquery('simple', 'the & king') order by "name" asc limit 6 offset 0`
		const pgp = { any: sinon.stub().returns([]) };
		const tablename = `"SearchApp"."table_search"`;
		const response = queries.searchQuery(searchparams, tablename, pgp);
		expect(response).to.equal(query);
	})

	it('should return search query with phraseto_tsquery when search value is passed with quotes', () => {
		const searchparams: SearchParamsDTO = {
			search: `"the king"`,
			orderby: 'name',
			orderdirection: 'asc',
			itemsperpage: 6,
			pagenumber: 1,
			offset: 0
		}

		const query = `select id, name, imageurl, description, count(*) OVER() AS totalCount\n\t\t\t\t from "SearchApp"."table_search" where  searchterms @@ phraseto_tsquery('simple', 'the king') order by "name" asc limit 6 offset 0`
		const pgp = { any: sinon.stub().returns([]) };
		const tablename = `"SearchApp"."table_search"`;
		const response = queries.searchQuery(searchparams, tablename, pgp);
		expect(response).to.equal(query);
	})
})