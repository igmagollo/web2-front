import {ApiRequester} from '../core/api-requester.js';

const path_rest = 'hotels';
export class HoteisService extends ApiRequester{
	constructor() {
		super(path_rest);
	}
};