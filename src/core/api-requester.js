import Axios from 'axios-observable';
import { Instance as Http } from './axios-instance';
import User from './user-service';

export class ApiRequester {
	constructor(path) {
		this.path = path;
		if (this.path[-1] != '/')
			this.path += '/';
		this.Http = Http;
		this.user = User.getInstance();
	}

	list() {
		const request = this.Http.get(this.path);
		return request;
	}

	retrieve(id) {
		return Axios.get(this.api + this.path + id);
	}

	create(data) {
		const request = this.Http.post(this.path, data);
		return request;
	}

	update(data) {
		return Axios.post(this.api + this.path + data.id, data);	
	}

	destroy(id) {
		return Axios.delete(this.api + this.path + id);
	}
};
