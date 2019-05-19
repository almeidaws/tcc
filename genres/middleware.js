'use strict';

const genresDatabase = require('./database.js');
const createError = require('http-errors');
const fs = require('fs');

async function getAll(request, response, next) {
    try {
        const queries = await genresDatabase.connect();
        const authors = await queries.getAllGenres();

        response.status(200).json(authors).end();
    } catch (error) {
        next(error);
    }
}
module.exports = { getAll }
