import Utils from './Utils.js';

const U = Utils;

/**
 * This class used as a namespace containts all methods used 
 * to make requests to the RESTful API. You should always
 * used this method for login, registering, getting user's info
 * and etc.
 */
class Requisition {
    /**
     * Adds user's id and access token to cookies if it was successfully logged.
     *
     * When the user is loggged successfully, two cookies are created: the first
     * named 'id' contains user's id used further on some requisitions, the second
     * named 'token' contains a valued used to do requests that access private data.
     *
     * If the logging succeed, the current page is reloaded.
     *
     * This method also calles the 'userInfo' method to also get user's name and email.
     *
     * @param {string} email user's email.
     * @param {string} password user's password.
     * @param {Function} success callback called when the user is 
     * logged successfully. The callback contains no arguments.
     * @param {Function} error fallback called when there's an error. The
     * agument function receive a status code. You should read the API
     * documentation to get a list of status code returned and when they're
     * returned.
     */
    static login(email, password, error, success) {
        const logged = (data, status) => {
            U.setCookie('id', data.id, 365);            
            U.setCookie('token', data.token, 365);            
            Requisition.userInfo(data.id, data.token, error, () => {
                if (success) success();
                location.reload();
            });
        }
        $.ajax('users/tokens', {
            method: 'POST',
            success: logged,
            error: (res) => { if (error) error(res.status) },
            data: { email, password },
        });
    }

    /**
     * Adds a cookie for user's name and email on the broswer.
     * 
     * When the requsition succeed a cookie named 'name' is created to
     * store user's name and another named 'email' is also created to
     * store user's email.
     *
     * @param {number} id user's id.
     * @param {string} token access token used to retrieve private data.
     * @param {Function} success callback without arguments called when 
     * @param the requisiton is successfully made.
     * @param {Function} error fallback called when there's a problem.
     * The HTTP status code is passed as argument. The possible values
     * are documented on the RESTful API page.
     */
    static userInfo(id, token, error, success) {
        const retrieved = (data, status) => {
           U.setCookie('name', data.name, 365);
           U.setCookie('email', data.email, 365);
           if (success) success();
        };
        $.ajax('users/' + id, {
            success: retrieved,
            error: (res) => { if (error) error(res.status) },
            headers: { Authorization: token },
        });
    }

    /**
     * Register users on the broswer.
     * 
     * When the requsition succeed not message is presenter.
     *
     * @param {string} name Name user to register.
     * @param {string} email Email user to register.
     * @param {string} password Password user to register.
     * @param {Function} error fallback called when there's a problem.
     * The HTTP status code is passed as argument. The possible values
     * are documented on the RESTful API page.
     */
    static register(name, email, password, error) {
        const registered = (data, status) => { Requisition.login(email, password, error); }

        $.ajax('users/', {
            method: 'POST',
            success: registered,
            error: (res) => { if (error) error(res.status) },
            data: { name, email, password },
        });
    }

    static logout(token,error) {
        const logout = (data,error) => { Requisition.logout(token,error); U.deleteAllCookies();}

        $.ajax('users/tokens/' + token, {
            method: 'DELETE',
            success: logout,
            error: (res) => {if (error) error(res.status) },
            data: { token }
        }) 
    }

    static allAuthors(success, error) {
        const fetched = (data) => {
            success(data);
        }

        $.ajax('authors/', {
            method: 'GET',
            success: fetched,
            error: (res) => {if (error) error(res.status) },
        }) 
    }

    static allGenres(success, error) {
        const fetched = (data) => {
            success(data);
        }

        $.ajax('genres/', {
            method: 'GET',
            success: fetched,
            error: (res) => {if (error) error(res.status) },
        }) 
    }
}

export default Requisition;
