import {ApiRequester} from '../core/api-requester.js';

const path_rest = 'promocoes';
export class PromocoesService extends ApiRequester{
	constructor() {
		super(path_rest);
	}
};