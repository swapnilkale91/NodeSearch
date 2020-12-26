/* App Level constants */
export const SEARCH_TABLE_NAME = 'table_search';
export const SEARCH_SCHEMA_NAME  = 'SearchApp';

/* Search columns */
export const ITEMSPERPAGE = 'itemsperpage';
export const PAGENUMBER = 'pagenumber';
export const OFFSET = 'offset';
export const SEARCH = 'search';
export const ORDERBY = 'orderby';
export const ORDERDIRECTION = 'orderdirection';
export const NAME = 'name';
export const DATELASTEDITED = 'datelastedited';
export const ORDERBYDIRECTIONASC = 'asc';
export const ORDERBYDIRECTIONDESC = 'desc';
export const SEARCH_VALID_PROPERTIES = [ITEMSPERPAGE, PAGENUMBER, OFFSET, SEARCH, ORDERBY, ORDERDIRECTION];

/* Error messages */
export let INT_TYPE_ERROR = (prop: any, type: any) => `Property ${prop} should be a positive ${type}`;
export let ORDERBY_TYPE_ERROR = (prop: any) => `Property ${prop} is not a valid sort type`;
export let ORDERDIRECTION_TYPE_ERROR = (prop: any) => `Property ${prop} is not a valid sort direction. Please input '${ORDERBYDIRECTIONASC}' or '${ORDERBYDIRECTIONDESC}'`;
export let INVALID_PROP = (prop: any) => `Invalid property ${prop}. Valid properties are ${SEARCH_VALID_PROPERTIES}`;