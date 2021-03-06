import React from 'react';
import {api} from './config.js';
import Axios from 'axios-observable';
import {useCookies} from 'react-cookie';

class Cookie extends React.Component {
    static getCookie() {
        const [cookies, setCookie] = useCookies(['auth']);
        return [cookies, setCookie];
    }
}

export const Instance = Axios.create({
    baseURL: api,
});

export const setAuth = (auth) => {
    const setCookie = Cookie.getCookie()[1];
    setCookie('auth', auth);
}


