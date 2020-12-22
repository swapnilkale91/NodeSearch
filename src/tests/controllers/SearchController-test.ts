import chai from 'chai';
import * as sinon from 'sinon';
import express, { Application } from 'express';
import { SearchController } from '../../app/controllers/SearchController';
import { SearchService } from '../../app/services/SearchService';
import { SearchValidation } from '../../app/validators/SearchValidation';
import { Dependencies } from '../../app/types/dependencies';
import { SearchParamsDTO } from 'common';

const app = express();
const dependencies = new Dependencies();
const expect = chai.expect;
let searchservicestub: any;
let searchvalidationstub: any;
let req: any;
let res: any;
let output: any = [
	{
	  id: 332,
	  name: 'Regional Marketing Developer',
	  imageurl: 'http://lorempixel.com/640/480',
	  description: 'Consequatur enim quo. Vitae non autem quas. Omnis accusantium suscipit consequatur eaque ut voluptatibus est. Qui non atque quasi. Ut rerum aut totam temporibus. Beatae aliquam voluptatem dolorum nobis quia omnis deleniti esse voluptas.',
	  datelastedited: '2018-10-05T01:06:12.605Z',
	  totalcount: 3000
	},
	{
	  id: 432,
	  name: 'Regional Marketing Developer',
	  imageurl: 'http://lorempixel.com/640/480',
	  description: 'Consequatur enim quo. Vitae non autem quas. Omnis accusantium suscipit consequatur eaque ut voluptatibus est. Qui non atque quasi. Ut rerum aut totam temporibus. Beatae aliquam voluptatem dolorum nobis quia omnis deleniti esse voluptas.',
	  datelastedited: '2018-10-05T01:06:12.605Z',
	  totalcount: 3000
	},
	{
	  id: 132,
	  name: 'Regional Marketing Developer',
	  imageurl: 'http://lorempixel.com/640/480',
	  description: 'Consequatur enim quo. Vitae non autem quas. Omnis accusantium suscipit consequatur eaque ut voluptatibus est. Qui non atque quasi. Ut rerum aut totam temporibus. Beatae aliquam voluptatem dolorum nobis quia omnis deleniti esse voluptas.',
	  datelastedited: '2018-10-05T01:06:12.605Z',
	  totalcount: 3000
	},
	{
	  id: 232,
	  name: 'Regional Marketing Developer',
	  imageurl: 'http://lorempixel.com/640/480',
	  description: 'Consequatur enim quo. Vitae non autem quas. Omnis accusantium suscipit consequatur eaque ut voluptatibus est. Qui non atque quasi. Ut rerum aut totam temporibus. Beatae aliquam voluptatem dolorum nobis quia omnis deleniti esse voluptas.',
	  datelastedited: '2018-10-05T01:06:12.605Z',
	  totalcount: 3000
	},
	{
	  id: 32,
	  name: 'Regional Marketing Developer',
	  imageurl: 'http://lorempixel.com/640/480',
	  description: 'Consequatur enim quo. Vitae non autem quas. Omnis accusantium suscipit consequatur eaque ut voluptatibus est. Qui non atque quasi. Ut rerum aut totam temporibus. Beatae aliquam voluptatem dolorum nobis quia omnis deleniti esse voluptas.',
	  datelastedited: '2018-10-05T01:06:12.605Z',
	  totalcount: 3000
	},
	{
	  id: 532,
	  name: 'Regional Marketing Developer',
	  imageurl: 'http://lorempixel.com/640/480',
	  description: 'Consequatur enim quo. Vitae non autem quas. Omnis accusantium suscipit consequatur eaque ut voluptatibus est. Qui non atque quasi. Ut rerum aut totam temporibus. Beatae aliquam voluptatem dolorum nobis quia omnis deleniti esse voluptas.',
	  datelastedited: '2018-10-05T01:06:12.605Z',
	  totalcount: 3000
	}
  ]

describe('Testing the Controller Service ', () => {
	beforeEach(done => {
		req = {
			'query': {
				'search': 'sometext',
				'itemsperpage': '6',
				'orderby': 'datelastedited',
				'pagenumber': '1',
				'orderdirection': 'desc'
			}
		};
	
		res = {
			'location': sinon.spy(),
			'send': sinon.spy(),
			'status': sinon.spy()
		};

		searchservicestub = sinon.stub(SearchService.prototype, 'getSearch');
		searchvalidationstub = sinon.stub(SearchValidation.prototype, 'validateSearchRequest');
		done();
	});
	afterEach(done => {
		searchservicestub.restore();
		done();
	});
	it('should get call service get search ', () => {
		const searchparamscalled: any = { search: 'sometext', itemsperpage: '6', orderby: 'datelastedited', pagenumber: '1', orderdirection: 'desc' };
		searchservicestub.resolves(output);
		searchvalidationstub.resolves(true);
		const response = new SearchController(app, dependencies).getSearch(req, res);
		sinon.assert.calledOnce(searchservicestub);
		sinon.assert.calledWith(searchservicestub, searchparamscalled);
	})
})