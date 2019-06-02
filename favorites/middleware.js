'use strict';

const database = require('./database.js');
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

async function getByMusic(request, response, next) {
    try {
        if (!request.params.musicID) throw createError(401, `The musics's id is missing`);
        const queries = await authorsDatabase.connect();
        const authors = await queries.getAuthorsByMusic(request.params.musicID);

        response.status(200).json(authors).end();
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
    } catch (error) {
        next(error);
    }
}

module.exports = { add, getAll, getByID, deleteFavorite, getByMusic }
