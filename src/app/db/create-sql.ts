export let createSchema = (schema: string) => `CREATE SCHEMA IF NOT EXISTS "${schema}"`;

export let createSearchTable = (tablename: string): string => {
	const query = `CREATE TABLE IF NOT EXISTS ${tablename}(
		id SERIAL,
		name character varying(150) NOT NULL,
		imageurl character varying(2000) NOT NULL,
		description TEXT,
		dateLastEdited TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
	)`;

	return query;
};

export let getInsertColumnSet = (pgp: any, tablename: string) => {
	return new pgp.helpers.ColumnSet([
		{ 'name': 'name'},
		{ 'name': 'imageurl', 'prop': 'image'},
		{ 'name': 'description'},
		{ 'name': 'datelastedited', 'prop': 'dateLastEdited'}
	], {'table': tablename});
};

export let getTableName = (tablename: string, schemaname: string, pgp: any) =>
	new pgp.helpers.TableName({ table: tablename, schema: schemaname });