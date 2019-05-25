'use strict';

const sessionsDatabase = require('../sessions/database.js');
const usersDatabase = require('./database.js');
const createError = require('http-errors');
const uuidv4 = require('uuid/v4');

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
        const queries = await usersDatabase.connect();
        const body = request.body;
        const user = new usersDatabase.User(body.name, body.email, body.password);

        const { id: userID } = await queries.addUser(user);

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
        const usersQueries = await usersDatabase.connect();
        const sessionsQueries = await sessionsDatabase.connect();
        const { id } = await usersQueries.authUser(email, password);
        
        const oneYearAhead = (() => { 
            const now = new Date(); 
            now.setFullYear(now.getFullYear() + 1); 
            return now;
        })();

        const token = uuidv4();
        const session = new sessionsDatabase.Session(token, id, oneYearAhead);
        await sessionsQueries.addSession(session);
        response.status(200).json({ id, token }).end();
    } catch (error) {
        next(error);
    }
}

/**
 * Removes user's information from this session performing this
 * way the logout. It just removes the user's id from the current session.
 */
async function logout(request, response, next) {
    try {
        const token = request.params.token;
        if (!token)
            throw createError(401, 'Access Token not provided, please provide one to logout');

    const sessionsQueries = await sessionsDatabase.connect();
    await sessionsQueries.deleteSession(token);
    response.status(204).end();
    } catch (error) {
        next(error);
    }
}

/** 
 * Middleware that retrieve user's information thorugh it's id. If the request user isn't
 * the current user, it throws and error.
 */
async function view(request, response, next) {
    try {
        const token = request.get('Authorization');
        if (!token) 
            throw createError(401, 'Access Token not provided, please login to get one');

        const sessionsQueries = await sessionsDatabase.connect();
        const usersQueries = await usersDatabase.connect();
        const session = await sessionsQueries.getSession(token);
        if (session.userID !== parseInt(request.params.id))
            throw createError(401, 'You aren\'t authorized to access this user');

        const user = await usersQueries.getUser(session.userID);
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
    view,
}
