import Axios from 'axios-observable';
import { Instance as Http } from './axios-instance';
import User from './user-service';
import { CookieService } from './cookie-service';

export class ApiRequester {
	constructor(path) {
		this.path = path;
		if (this.path[-1] != '/')
			this.path += '/';
		this.Http = Http;
		this.user = User.getInstance();
	}

	getOptions() {
		const options = {};
		console.log("Ta logado?", this.user.isLoggedIn);
		if (this.user.isLoggedIn) {
			options['headers'] = {
				Authorization: `Token ${CookieService.getCookie('auth')}`
			}
		}
		return options;
	}

	list() {
		return this.Http.get(this.path, this.getOptions());
	}

	retrieve(id) {
		return this.Http.get(this.path + id, this.getOptions());
	}

	create(data) {
		return this.Http.post(this.path, data, this.getOptions());
	}

	update(data) {
		return this.Http.post(this.path + data.id, data, this.getOptions());
	}

	destroy(id) {
		return this.Http.delete(this.path + id, this.getOptions());
	}
};
