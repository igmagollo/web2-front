import {CookieService as Cookie} from './cookie-service';
import {Instance as Http} from './axios-instance';

export default class User {
    static instance = null;
    
    isLoggedIn = false;
    data = {};

    static getInstance() {
        if (User.instance == null) {
            User.instance = new User();
        }

        return User.instance;
    }

    verifyLogin(callback) {
        if (Cookie.getCookie('auth')) {
            Http.get('/user').subscribe(
                (response) => {
                    this.date = response.data;
                    this.isLoggedIn = true;
                    callback();
                },
                (err) => {
                    Cookie.setCookie('auth', '');
                    this.isLoggedIn = false;
                    callback();
                }
            )
        } else {
            this.isLoggedIn = false;
            callback();
        }
    }

    getUserData() {
        return this.data;
    }
};
