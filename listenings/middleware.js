'use strict';

const database = require('./database.js');
const authorsDatabase = require('../authors/database.js');
const genresDatabase = require('../genres/database.js');
const favoritesDatabase = require('../favorites/database.js');
const createError = require('http-errors');
const fs = require('fs');

/**
 * Adds a new listening entry to the database.
 */
async function add(request, response, next) {
    try {
        const body = request.body;
        
        if (!body.musicID) throw createError(401, `The musicID is missing`);

        const listening = new database.Listening(body.musicID);
        const queries = await database.connect();
        const addedListening = await queries.addListening(listening);

        console.log(addedListening);
        database.disconnect();
        response.status(201).end();
    } catch (error) {
        next(error);
    }
}

async function getLastListenedMusics(request, response, next) {
    try {

        const queries = await database.connect();
        const authorQueries = await authorsDatabase.connect();
        const genresQueries = await genresDatabase.connect();
        const favoritesQueries = await favoritesDatabase.connect();
        const musics = await queries.getLastListenedMusics();

        const favorited = async (userID, musicID) => {
            if (!userID) return undefined;
            const favorite = new favoritesDatabase.Favorite(parseInt(userID), musicID);
            return await favoritesQueries.checkFavorite(favorite);
        };

        const withFileURLs = musics.map(async music => ({ id: music.id, 
                                                    name: music.name, 
                                                    url: music.calculateFileURL(),
                                                    posterURL: music.posterUID ? music.calculatePosterURL() : null,
                                                    duration: music.duration,
                                                    authors: await authorQueries.getAuthorsByMusic(music.id),
                                                    genres: await genresQueries.getAllGenresFromMusic(music.id),
                                                    favorited: await favorited(request.query.userID, music.id),
                                                    }));
        database.disconnect();
        authorsDatabase.disconnect();
        genresDatabase.disconnect();
        favoritesDatabase.disconnect();                                            
        response.status(200).json(await Promise.all(withFileURLs)).end();
    } catch (error) {
        next(error);
    }
}

module.exports = { add, getLastListenedMusics }
