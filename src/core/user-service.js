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
            Http.get('test-auth/', {
                headers: {
                    Authorization: `Token ${Cookie.getCookie('auth')}`
                }
            }).subscribe(
                (response) => {
                    this.data = response.data;
                    this.isLoggedIn = true;
                    callback(true);
                },
                (err) => {
                    this.isLoggedIn = false;
                    callback(false);
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

    logout() {
        this.isLoggedIn = false;
        Cookie.setCookie('auth', '');
    }
};
