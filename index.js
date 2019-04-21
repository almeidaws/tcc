/**
 * @fileOverview contains routes used and the as the entry point to server's features.
 *
 * @author Gustavo Amaral
 * @author Renan Alves
 */

// MODULES
const { upload: s3Upload, getStream: s3GetStream } = require('./s3/s3.js');
const { runMigrations } = require('./migrations/run.js');
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path');
const bodyparser = require('body-parser');
const { Database, Server } = require('./configs.js');
const { 
    register: handleUserRegister,
    view: handleViewUser,
    login: handleUserLogin,
    logout: handleUserLogout,
} = require('./users/middleware.js');

const { 
    add: handleAddMusic, 
    getByID: handleGetMusic, 
    getAll: handleGetAllMusics,
    deleteMusic: handleDeleteMusic,
} = require('./musics/middleware.js');

const { 
    add: handleAddAuthor,
    getAll: handleGetAllAuthors,
    getByID: handleGetAuthor
} = require('./authors/middleware.js');

// Run pending migrations
runMigrations();

// MIDDLEWARES
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileUpload());

// USER'S ROUTES
app.post('/user/register', (request, response) => { response.status(301, '/users') });
app.post('/users', handleUserRegister);
app.get('/users/:id', handleViewUser);
app.post('/users/tokens', handleUserLogin);
app.delete('/users/tokens/:token', handleUserLogout);

// MUSICS'S ROUTES 
app.post('/musics', handleAddMusic);
app.get('/musics', handleGetAllMusics);
app.get('/musics/:id', handleGetMusic);
app.delete('/musics/:id', handleDeleteMusic);

// AUHTOR'S ROUTES
app.post('/authors', handleAddAuthor);
app.get('/authors', handleGetAllAuthors);
app.get('/authors/:id', handleGetAuthor);

//SERVER STARTING
app.use(express.static(path.join(__dirname, 'prod/')))
app.listen(Server.port, () => console.log(`Listening on ${ Server.port }`))

