import { SearchParamsDTO } from "common";

export let searchQuery = (searchparams: SearchParamsDTO, tablename: string, pgp: any) => {
	let query = `select id, name, imageurl, description, count(*) OVER() AS totalCount
				 from ${tablename}`
	if (!searchparams.search) {
		query += getOrderByQuery(searchparams);
		query += getLimitOffsetQuery(searchparams);
	} else {
		query += getWhereClause(searchparams.search);
		query += getOrderByQuery(searchparams);
		query += getLimitOffsetQuery(searchparams);
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

function getOrderByQuery(searchparams: SearchParamsDTO) {
	if(searchparams.orderby)
		return ` order by "${searchparams.orderby}" ${searchparams.orderdirection || 'asc'}`;
	else
		return ``;
}

function getLimitOffsetQuery(searchparams: SearchParamsDTO) {
	if(searchparams.itemsperpage)
		return ` limit ${searchparams.itemsperpage} offset ${searchparams.offset || 0}`;
	else
		return ``;
}