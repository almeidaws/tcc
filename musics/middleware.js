'use strict';

const musicsDatabase = require('./database.js');
const authorsDatabase = require('../authors/database.js');
const genresDatabase = require('../genres/database.js');
const favoritesDatabase = require('../favorites/database.js');
const createError = require('http-errors');
const fs = require('fs');
const { Readable } = require('stream');
const mm = require('music-metadata');

/**
 * Adds a new music to the database. This endpoint receive some music's metadata
 * and it's file and send it to the the database and internal storage.
 */
async function add(request, response, next) {
    try {
        if (!request.body.genre) throw createError(400, `Genres is missing`);
        if (!request.body.author) throw createError(400, `Authors is missing`);
        if (!request.files) throw createError(400, `There's no file`);
        if (!request.files.music) throw createError(400, `There's no music file`);
        if (!request.files.poster) throw createError(400, `There's no music poster`);

        // Get's music metadata
        const body = request.body;
        const genres = toArrayOfNumbers(body.genre);
        const authors = toArrayOfNumbers(body.author);
        const extension = getExtension(request.files.music.name);
        const posterExtension = getExtension(request.files.poster.name);
        const metadata = await mm.parseBuffer(request.files.music.data, 
                                              request.files.music.mimetype,
                                              { duration: true });
        const duration = metadata.format.duration;
        const music = new musicsDatabase.Music(body.name, 
                                               genres,
                                               authors,
                                               request.files.music.data,
                                               extension,
                                               request.files.poster.data,
                                               posterExtension,
                                               duration);

        const queries = await musicsDatabase.connect();
        await queries.addMusic(music, progress => {
            console.log(`${progress}% uploaded`);
        });
        response.status(201);
        response.end();
        await musicsDatabase.disconnect();
    } catch (error) {
        next(error);
    }
}

/**
 * Retrieve a music from the database by its ID. This entity contains a link with the
 * music's file that you can you to play it somewhere.
 */
async function getByID(request, response, next) {
    try {

        if (!request.params.id) throw createError(401, `The music's id is missing`);
        const queries = await musicsDatabase.connect();
        const authorQueries = await authorsDatabase.connect();
        const genresQueries = await genresDatabase.connect();
        const music = await queries.getMusicByID(request.params.id);

        const { id, name, duration } = music;
        const authors = await authorQueries.getAuthorsByMusic(music.id);
        const genres = await genresQueries.getAllGenresFromMusic(music.id);
        const url = music.calculateFileURL();
        const posterURL = music.posterUID ? music.calculatePosterURL() : null;
        await musicsDatabase.disconnect();
        await authorsDatabase.disconnect();
        await genresDatabase.disconnect();

        response.status(200).json({ id, name, url, posterURL, authors, genres, duration }).end();
        // await musicsDatabase.disconnect();
        // await authorsDatabase.disconnect();
        // await genresDatabase.disconnect();
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves all musics from the database as an array of Music.
 */
async function getAll(request, response, next) {
    try {
    
        const queries = await musicsDatabase.connect();
        const authorQueries = await authorsDatabase.connect();
        const genresQueries = await genresDatabase.connect();
        const favoritesQueries = await favoritesDatabase.connect();
        const musics = await queries.getAllMusics();
        if (musics === null)
            response.status(204).json([]).end();

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
        
        response.status(200).json(await Promise.all(withFileURLs)).end();
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves all musics from the database as an array of Music.
 */
async function deleteMusic(request, response, next) {
    try {
        if (!request.params.id) { throw createError(400, "The music's ID is missing") }
        const id = parseInt(request.params.id);
        if (Number.isNaN(id)) { throw createError(400, `The ID '${request.params.id}' isn't a number`) }


        const queries = await musicsDatabase.connect();
        const deleted = await queries.deleteMusic(id);
        if (deleted)
            response.status(200).end();
        response.status(404).end();
    } catch (error) {
        next(error);
    }
};


const getExtension = fileName => {
    const groups = fileName.match(/.*(\..+)/);
    if (groups.length >= 1) return groups[groups.length - 1];
    return ""
};

/**
 * Transform an array of strings of a singleton string to an array of numbers.
 * @param {Array<String>} or {String} the value to be transformed.
 * @returns {Array<Number>} the array created from the parameter.
 */
const toArrayOfNumbers = value => {
    const array = toArrayIfNeeded(value);
    return elementsToIntegers(array);
};

/**
 * Returns a single value transfomed into array or the own value if
 * the value already is an array.
 */
const toArrayIfNeeded = value => Array.isArray(value) ? value : [value];
/**
 * Returns a new array where each parameter's array argument is parsed to an integer.
 */
const elementsToIntegers = array => array.map(element => parseInt(element));

module.exports = { add, getByID, getAll, deleteMusic };
