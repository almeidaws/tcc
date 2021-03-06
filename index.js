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
    getByID: handleGetAuthor,
    deleteAuthor: handleDeleteAuthor,
    getByMusic: handleAuthorsByMusic,
} = require('./authors/middleware.js');

const { 
    getAll: handleGetAllGenres,
    getByMusic: handleGenresByMusic,
} = require('./genres/middleware.js');

const { 
    add: handleAddFavorite,
    deleteFavorite: handleDeleteFavorite,
    getByUserID: handleGetByUserID,
} = require('./favorites/middleware.js');

const { 
    add: handleAddListening,
    getLastListenedMusics: handleLastListened,
} = require('./listenings/middleware.js');

const {
    get: handleGetRecommendations,
} = require('./recommendations/middleware.js');

// Run pending migrations
runMigrations();

// MIDDLEWARES
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileUpload());

// USERS' ROUTES
app.post('/user/register', (request, response) => { response.status(301, '/users') });
app.post('/users', handleUserRegister);
app.get('/users/:id', handleViewUser);
app.post('/users/tokens', handleUserLogin);
app.delete('/users/tokens/:token', handleUserLogout);

// MUSICS' ROUTES 
app.post('/musics', handleAddMusic);
app.get('/musics', handleGetAllMusics);
app.get('/musics/:id', handleGetMusic);
app.delete('/musics/:id', handleDeleteMusic);

// AUTHORS' ROUTES
app.post('/authors', handleAddAuthor);
app.get('/authors', handleGetAllAuthors);
app.get('/authors/:id', handleGetAuthor);
app.get('/musics/:musicID/authors', handleAuthorsByMusic);
app.delete('/authors/:id', handleDeleteAuthor);

// GENRES' ROUTES
app.get('/genres', handleGetAllGenres);
app.get('/musics/:musicID/genres', handleGenresByMusic);

// FAVORITES' ROUTES
app.post('/favorites', handleAddFavorite);
app.delete('/favorites/:userID/:musicID', handleDeleteFavorite);
app.get('/favorites/:userID', handleGetByUserID);

// LISTENING' ROUTES
app.post('/listenings', handleAddListening);
app.get('/listenings', handleLastListened);

//RECOMMENDATIONS ROUTES
app.get('/recommendations/:userID',handleGetRecommendations);

//SERVER STARTING
app.use(express.static(path.join(__dirname, 'prod/')))
app.listen(Server.port, () => console.log(`Listening on ${ Server.port }`))