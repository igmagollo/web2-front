import {ApiRequester} from '../core/api-requester.js';

const path_rest = 'sitesdereserva';
export class SitesReservaService extends ApiRequester{
	constructor() {
		super(path_rest);
	}
};
