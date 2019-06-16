'use strict';

const genresDatabase = require('./database.js');
const createError = require('http-errors');
const fs = require('fs');

async function getAll(request, response, next) {
    try {
        const queries = await genresDatabase.connect();
        const authors = await queries.getAllGenres();
        await genresDatabase.disconnect();
        response.status(200).json(authors).end();
    } catch (error) {
        next(error);
    }
}

async function getByMusic(request, response, next) {
    try {
        if (!request.params.musicID) throw createError(401, `The musics's id is missing`);
        const queries = await genresDatabase.connect();
        const genres = await queries.getAllGenresFromMusic(request.params.musicID);
        await genresDatabase.disconnect();
        response.status(200).json(genres).end();
    } catch (error) {
        next(error);
    }
}
module.exports = { getAll, getByMusic }
