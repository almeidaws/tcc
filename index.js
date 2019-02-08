/**
 * @fileOverview contains routes used and the as the entry point to server's features.
 *
 * @author Gustavo Amaral
 * @author Renan Alves
 */

// MODULES
const express = require('express');
const app = express();
const path = require('path');
const database = require('./database/database.js');
const bodyparser = require('body-parser');
const { Database, Session, Server } = require('./configs.js');

// MIDDLEWARES
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(Session.createMiddleware());

// USER'S ROUTES
app.post('/user/register', handleUserRegister);
app.get('/users/:id', handleUserInformationGetting);
app.post('/users/login', handleUserLogin);
    
//SERVER STARTING
app.use(express.static(path.join(__dirname, 'public')))
app.listen(Server.port, () => console.log(`Listening on ${ Server.port }`))

/** 
 * Registers a new user on the database based on a request from
 * client. This function is async.
 *
 * @param {Pool.Request} request request object received by the post middleware function.
 * @param {Pool.Response} response response object received by the middle function.
 * @param {Function} next next callback received from the the request object.
 */
async function handleUserRegister(request, response, next) {
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
async function handleUserLogin(request, response, next) {
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

/** Middleware that retrieve user's information thorugh it's id. If the request user isn't
 * the current user, it throws and error.
 */
async function handleUserInformationGetting(request, response, next) {
    try {
        const userID = parseInt(request.params.id);
        if (userID !== request.session.userID) {
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

