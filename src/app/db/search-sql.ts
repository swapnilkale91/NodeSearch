import { SearchParamsDTO } from "common";

export let searchQuery = (searchparams: SearchParamsDTO, tablename: string, pgp: any) => {

	let query = `select *,  count(*) OVER() AS totalCount
				 from ${tablename} `
	if (!searchparams.search) {
		query += orderLimitOffset(searchparams);
	} else {
		query += getWhereClause(searchparams.search);
		query += orderLimitOffset(searchparams);
	}

	return query;
};

function getWhereClause(search: string) {
	let whereclause: string = `where`;

	if (!search.includes('"')) {
		let searchwords: Array<string> = search.trim().split(' ');
		searchwords.forEach(function (elem, index) {
			whereclause += ` "name" like '%${elem}%' or "description" like '%${elem}%' or `;
		})
		whereclause = whereclause.substr(0, whereclause.length - 3);
	} else {
		search = search.replace(/"/g, '');
		whereclause += ` "name" like '%${search}%' or "description" like '%${search}%' `;
	}

	return whereclause;
}

function orderLimitOffset(searchparams: SearchParamsDTO) {
	return searchparams.orderby ? `order by "${searchparams.orderby}" ${searchparams.orderdirection || 'asc'} limit ${searchparams.itemsperpage} offset ${searchparams.offset}` : '';
}