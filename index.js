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
const bodyparser = require('body-parser');
const { Database, Session, Server } = require('./configs.js');
const { 
    register: handleUserRegister,
    userFields: handleUserFields,
    login: handleUserLogin,
    logout: handleUserLogout,
} = require('./middleware/users.js');


// MIDDLEWARES
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(Session.createMiddleware());

// USER'S ROUTES
app.post('/user/register', (request, response) => { response.status(301, 'users/register') });
app.post('/users/register', handleUserRegister);
app.get('/users/current', handleUserFields);
app.post('/users/login', handleUserLogin);
app.post('/users/logout', handleUserLogout);
    
//SERVER STARTING
app.use(express.static(path.join(__dirname, 'public')))
app.listen(Server.port, () => console.log(`Listening on ${ Server.port }`))

