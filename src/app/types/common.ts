export type SearchId = number;

export interface SearchDTO {
	id: SearchId;
	name: string;
	image: string;
	description: string;
}

export interface SearchParamsDTO {
	itemsperpage?: number;
	pagenumber?: number;
	offset?: number;
	search?: string;
	orderby?: string;
	orderdirection?: string;
}
