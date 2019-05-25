import Utils from './Utils.js';
import $ from 'jquery';

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
        };
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
    static register(name, email, password, error, success) {
        const registered = (data, status) => {
            Requisition.login(email, password, error, success)
        }

        $.ajax('users/', {
            method: 'POST',
            success: registered,
            error: (res) => { if (error) error(res.status) },
            data: { name, email, password },
        });
    }

    /**
     * Logout user on the broswer.
     *
     * When the requsition succeed not message is presenter.
     *
     * @param {string} token token used by user.
     * @param {Function} error fallback called when there's a problem.
     * The HTTP status code is passed as argument. The possible values
     * are documented on the RESTful API page.
     */
    static logout(token, success, error) {
        const logout = (data) => { 
            U.deleteAllCookies();
            success();
        }

        $.ajax('users/tokens/' + token, {
            method: 'DELETE',
            success: logout,
            error: (res) => {if (error) error(res.status) },
            data: { token }
        }) 
    }

    /**
     * Retrive all authors stored on the server.
     * It was created to be used when suggesting authors name on music
     * uploading.
     *
     * @param {Function} success callback containing an array of authors.
     * each author element in the array is a plain object with the properties
     * 'id' of type integer and 'name' of type string.
     * @param {Function} error fallback called when there's a problem.
     * The HTTP status code is passed as argument. The possible values
     * are documented on the RESTful API page.
     */
    static allAuthors(success, error) {
        const fetched = (data) => {
            success(data);
        };

        $.ajax('authors/', {
            method: 'GET',
            success: fetched,
            error: (res) => {if (error) error(res.status) },
        }) 
    }

    static getAllMusics(success, error) {

        const music = (data) => {
            success(data);
        };

        $.ajax('musics/', {
            method: 'GET',
            success: music,
            error: (res) => { if (error) error(res.status) },
        });
    }

    /**
     * Retrive all genres stored on the server.
     * It was created to be used to create selection box of genres when
     * uploading musics.
     *
     * @param {Function} success callback containing an array of genres.
     * each author element in the array is a plain object with the properties
     * 'id' of type integer and 'name' of type string.
     * @param {Function} error fallback called when there's a problem.
     * The HTTP status code is passed as argument. The possible values
     * are documented on the RESTful API page.
     */
    static allGenres(success, error) {
        const fetched = (data) => {
            success(data);
        };

        $.ajax('genres/', {
            method: 'GET',
            success: fetched,
            error: (res) => {if (error) error(res.status) },
        }) 
    }

    /**
     * Adds an author on the server returned the added author with the 
     * autogenerated ID.
     *
     * @param {Function} success callback containing the added author.
     * This author is a plain object containing the properties 'id' of 
     * type integer and 'name' of type string.
     * @param {Function} error fallback called when there's a problem.
     * The HTTP status code is passed as argument. The possible values
     * are documented on the RESTful API page.
     */
    static addAuthor(name, success, error) {
        const fetched = (author) => {
            success(author);
        };

        $.ajax('authors/', {
            method: 'POST',
            success: fetched,
            error: (res) => { if (error) error(res.status) },
            data: { name },
        }) 
    }

    /**
     * Add a music to the server. 
     *
     * This music adds an author to the server before adding the music. This is made
     * so you can supply the author's name instead of its id.
     *
     * @param {string} name music's name.
     * @param {string} author an integer that is the same when you retrieve or add
     * authors to the web server.
     * @param {Array<number>} genres an array of integers that contains genre's ids.
     * @param {File} file music's file that will be added to Amazon S3.
     * @param {File} poster music's poster that will be added to Amazon S3.
     * @param {Function} success callback without arguments.
     * @param {Function} error fallback called when there's a problem.
     * The HTTP status code is passed as argument. The possible values
     * are documented on the RESTful API page.
     */
    static addMusic(name, author, genres, file, poster, success, error) {
        const fetched = () => { success(); }

        Requisition.addAuthor(author, author => {
            // Prepare data to be sent
            const formData = new FormData();
            formData.append('name', name);
            formData.append('author', author.id);
            genres.forEach(genre => formData.append('genre', genre));
            formData.append('music', file);
            formData.append('poster', poster);
            
            $.ajax('musics/', {
                method: 'POST',
                success: fetched,
                processData: false,
                contentType: false,
                error: (res) => { if (error) error(res.status) },
                data: formData
            }) 
        }, error);
    }
}

export default Requisition;
