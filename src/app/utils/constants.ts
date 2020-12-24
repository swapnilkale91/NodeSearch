/* App Level constants */
export const SEARCH_TABLE_NAME = 'table_search';
export const SEARCH_SCHEMA_NAME  = 'search_app';

/* Search columns */
export const ITEMSPERPAGE = 'itemsperpage';
export const PAGENUMBER = 'pagenumber';
export const OFFSET = 'offset';
export const SEARCH = 'search';
export const ORDERBY = 'orderby';
export const ORDERDIRECTION = 'orderdirection';
export const SEARCH_VALID_PROPERTIES = [ITEMSPERPAGE, PAGENUMBER, OFFSET, SEARCH, ORDERBY, ORDERDIRECTION];
export const SEARCH_MAND_PROPERTIES = [ITEMSPERPAGE, PAGENUMBER];

/* Messages */
export let TYPE_ERROR = (prop: any, type: any) => `property ${prop} should be of valid ${type} type`;
export let INVALID_PROP = (prop: any) => `Invalid property ${prop}. Valid properties are ${SEARCH_VALID_PROPERTIES}`;