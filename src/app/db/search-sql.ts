import { SearchParamsDTO } from "common";

export let searchQuery = (searchparams: SearchParamsDTO, tablename: string, pgp: any) => {

	let query = `select id, name, imageurl, description, count(*) OVER() AS totalCount
				 from ${tablename}`
	if (!searchparams.search) {
		query += orderLimitOffset(searchparams);
	} else {
		query += getWhereClause(searchparams.search);
		query += orderLimitOffset(searchparams);
	}

	return query;
};

function getWhereClause(search: string) {
	let whereclause: string = ` where `;

	if (!search.includes('"')) {
		let searchwords: string[] = search.split(' ');
		search = searchwords.join(' & ');
		whereclause += ` searchterms @@ to_tsquery('simple', '${search}')`
	} else {
		search = search.replace(/"/g, '');
		whereclause += ` searchterms @@ phraseto_tsquery('simple', '${search}')`;
	}

	return whereclause;
}

function orderLimitOffset(searchparams: SearchParamsDTO) {
	return ` order by "${searchparams.orderby || 'id'}" ${searchparams.orderdirection || 'asc'} limit ${searchparams.itemsperpage} offset ${searchparams.offset}`;
}