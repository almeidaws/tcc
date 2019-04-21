'use strict';

const authorsDatabase = require('./database.js');
const createError = require('http-errors');
const fs = require('fs');

/**
 * Adds a new music to the database. This endpoint receive some music's metadata
 * and it's file and send it to the the database and internal storage.
 */
async function add(request, response, next) {
    try {
        const body = request.body;
        
        // Get's music metadata
        const author = new authorsDatabase.Author(body.name);

        const queries = await authorsDatabase.connect();
        await queries.addAuthor(author);

        response.status(200);
        response.end();
    } catch (error) {
        next(error);
    }
}

async function getAll(request, response, next) {
    try {
        
        const queries = await authorsDatabase.connect();
        const authors = await queries.getAllAuthors();

        response.status(200).json(authors).end();
    } catch (error) {
        next(error);
    }
}

async function getByID(request, response, next) {
    try {
        if (!request.params.id) throw createError(401, `The author's id is missing`);
        const queries = await authorsDatabase.connect();
        const author = await queries.getAuthorByID(request.params.id);

        response.status(200).json(author).end();
    } catch (error) {
        next(error);
    }
}

module.exports = { add, getAll, getByID }
