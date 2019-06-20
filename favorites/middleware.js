'use strict';

const database = require('./database.js');
const authorsDatabase = require('../authors/database.js');
const genresDatabase = require('../genres/database.js');
const createError = require('http-errors');
const fs = require('fs');

/**
 * Adds a new favorite to the database. This endpoint receive some favorite's metadata
 * and it's file and send it to the the database and internal storage.
 */
async function add(request, response, next) {
    try {
        const body = request.body;
        
        if (!body.userID) throw createError(401, `The userID is missing`);
        if (!body.musicID) throw createError(401, `The musicID is missing`);

        const favorite = new database.Favorite(body.userID, body.musicID);
        const queries = await database.connect();
        const addedFavorite = await queries.addFavorite(favorite);
        response.status(201).end();
        await database.disconnect();
    } catch (error) {
        next(error);
    }
}

async function getByUserID(request, response, next) {
    try {
        if (!request.params.userID) throw createError(401, `The user's id is missing`);
        const queries = await database.connect();
        const authorQueries = await authorsDatabase.connect();
        const genresQueries = await genresDatabase.connect();
        const musics = await queries.getFavoritesByUserID(request.params.userID);

        const withFileURLs = musics.map(async music => ({ id: music.id, 
                                                    name: music.name, 
                                                    url: music.calculateFileURL(),
                                                    posterURL: music.posterUID ? music.calculatePosterURL() : null,
                                                    duration: music.duration,
                                                    authors: await authorQueries.getAuthorsByMusic(music.id),
                                                    genres: await genresQueries.getAllGenresFromMusic(music.id),
                                                    }));                                    
        response.status(200).json(await Promise.all(withFileURLs)).end();
        await database.disconnect();
        await authorsDatabase.disconnect();
        await genresDatabase.disconnect();
    } catch (error) {
        next(error);
    }
}

async function deleteFavorite(request, response, next) {
    try {
        if (!request.params.userID) throw createError(401, `The userID's id is missing`);
        if (!request.params.musicID) throw createError(401, `The musicID's id is missing`);
        const favorite = new database.Favorite(request.params.userID, request.params.musicID);

        const queries = await database.connect();
        const deleted = await queries.deleteFavorite(favorite);
        if (deleted) response.status(200).end();
        else response.status(404).end();
        await database.disconnect();
    } catch (error) {
        next(error);
    }
}

module.exports = { add, getByUserID, deleteFavorite }
