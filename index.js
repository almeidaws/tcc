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
const bcrypt = require('bcrypt');
const configs = require('./configs.js');

// MIDDLEWARES
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(configs.sessionMiddleware);

// USER'S ROUTES
app.post('/user/register', handleUserRegister);
    
//SERVER STARTING
app.use(express.static(path.join(__dirname, 'public')))
app.listen(configs.port, () => console.log(`Listening on ${ configs.port }`))

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
        const encryptedPassword = await bcrypt.hash(body.password, 10);
        const user = await new database.User(body.name, body.email, encryptedPassword);
        const result = await queries.addUser(user);
        const userID = result.rows[0];

        request.session.userID = userID;
        response.status(200);
        response.end();
    } catch (error) {
        next(error);
    }
};
