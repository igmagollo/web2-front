import Axios from 'axios-observable';
import {api} from './config.js';

export class ApiRequester {
	constructor(path) {
		this.api = api;
		this.path = path;
		if (this.path[-1] != '/')
			this.path + '/';
	}

	list() {
		return Axios.get(this.api + this.path);
	}

	retrieve(id) {
		return Axios.get(this.api + this.path + id);
	}

	create(data) {
		return Axios.post(this.api + this.path + id, data);
	}

	update(data) {
		return Axios.post(this.api + this.path + id, data);	
	}

	destroy(id) {
		return Axios.delete(this.api + this.path + id);
	}
};
