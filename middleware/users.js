'use strict';

const database = require('../database/database.js');

/** 
 * Registers a new user on the database based on a request from
 * client. This function is async.
 *
 * @param {Pool.Request} request request object received by the post middleware function.
 * @param {Pool.Response} response response object received by the middle function.
 * @param {Function} next next callback received from the the request object.
 */
async function register(request, response, next) {
    try {
        const queries = await database.connect();
        const body = request.body;
        const encryptedPassword = await database.User.hashPassword(body.password);
        const user = await new database.User(body.name, body.email, encryptedPassword);

        const { id: userID } = await queries.addUser(user);

        request.session.userID = userID;
        response.status(200);
        response.end();
    } catch (error) {
        next(error);
    }
};

/**
 * Checks the email and password supplied on request to verify if they
 * exists on the database. If it's true, adds to this session the ID
 * of that user performing finally the user login.
 */
async function login(request, response, next) {
    try {
        const body = request.body;
        const email = body.email;
        const password = body.password;
        const queries = await database.connect();
        const { id } = await queries.authUser(email, password);
        request.session.userID = id;
        response.status(200).end();
    } catch (error) {
        next(error);
    }
}

/**
 * Removes user's information from this session performing this
 * way the logout. It just removes the user's id from the current session.
 */
async function logout(request, response) {
    delete request.session.userID;
    response.status(204).end();
}

/** 
 * Middleware that retrieve user's information thorugh it's id. If the request user isn't
 * the current user, it throws and error.
 */
async function userFields(request, response, next) {
    try {
        const userID = request.session.userID;

        if (!userID) {
            response.status(401);
            throw new Error('Please, login before accessing user\'s information');
        }

        const queries = await database.connect();
        const user = await queries.getUser(userID);
        const publicUser = { name: user.name, email: user.email };
        response.status(200).json(publicUser);
        response.end();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    logout,
    login,
    userFields,
}
