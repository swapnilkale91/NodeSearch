export let createSchema = (schema: string) => `CREATE SCHEMA IF NOT EXISTS "${schema}"`;

export let createSearchTable = (tablename: string): string => {
	const query = `CREATE TABLE IF NOT EXISTS ${tablename}(
		id SERIAL,
		name character varying(150) NOT NULL,
		imageurl character varying(2000) NOT NULL,
		description TEXT,
		dateLastEdited TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
		searchterms tsvector
	)`;
	return query;
};

export let createSearchIndex = (tablename: string): string => {
	const query = `CREATE INDEX IF NOT EXISTS search_idx ON ${tablename} USING GIN (searchterms);`;

	return query;
}

export let createTSVectorTrigger = (tablename: string): string => {

	const query = `DROP TRIGGER IF EXISTS tsvectorupdate on ${tablename};
		CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
		ON ${tablename} FOR EACH ROW EXECUTE PROCEDURE
		tsvector_update_trigger(searchterms, 'pg_catalog.simple', name, description);`

	return query;
}

export let deleteSearchData = (tablename: string): string => {
	return  `DELETE FROM ${tablename};`
}

export let getInsertColumnSet = (pgp: any, tablename: string) => {
	return new pgp.helpers.ColumnSet([
		{ 'name': 'name' },
		{ 'name': 'imageurl', 'prop': 'image' },
		{ 'name': 'description' },
		{ 'name': 'datelastedited', 'prop': 'dateLastEdited' }
	], { 'table': tablename });
};

export let getTableName = (tablename: string, schemaname: string, pgp: any) =>
	new pgp.helpers.TableName({ table: tablename, schema: schemaname });