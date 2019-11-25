import {ApiRequester} from '../core/api-requester.js';

const path_rest = 'promocoes';
export class PromocoesService extends ApiRequester{
	constructor() {
		super(path_rest);
	}

	getByHotel(hotel) {
		return this.Http.get(`promocao/?hotel=${hotel}`, this.getOptions());
	}

	getBySite(site) {
		return this.Http.get(`promocao/?site=${site}`, this.getOptions());
	}

	getFiltered(cidade, dataInicio, dataFim) {
		return this.Http.get(
			`promocao/?cidade=${cidade}&data_inicio=${dataInicio}&data_fim=${dataFim}`, this.getOptions()
		);
	}
};