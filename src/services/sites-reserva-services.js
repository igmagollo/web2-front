//import React from 'react';
import Axios from 'axios-observable';
import {api} from '../core/config.js';
import ApiRequester from '../core/api-requester.js';

const path_rest = '';
export class SitesReservaServices extends ApiRequester{
	constructor() {
		super(path_rest);
	}
};
