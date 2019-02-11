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
const { Database, Server } = require('./configs.js');
const { 
    register: handleUserRegister,
    view: handleViewUser,
    login: handleUserLogin,
    logout: handleUserLogout,
} = require('./middleware/users.js');


// MIDDLEWARES
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// USER'S ROUTES
app.post('/user/register', (request, response) => { response.status(301, '/users') });
app.post('/users', handleUserRegister);
app.get('/users/:id', handleViewUser);
app.post('/users/tokens', handleUserLogin);
// app.delete('/users/tokens/:token', handleUserLogout);
    
//SERVER STARTING
app.use(express.static(path.join(__dirname, 'public')))
app.listen(Server.port, () => console.log(`Listening on ${ Server.port }`))

