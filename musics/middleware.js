'use strict';

const musicsDatabase = require('./database.js');
const createError = require('http-errors');
const fs = require('fs');
const { Readable } = require('stream');

/**
 * Adds a new music to the database. This endpoint receive some music's metadata
 * and it's file and send it to the the database and internal storage.
 */
async function add(request, response, next) {
    try {
        // Get's music metadata
        const body = request.body;
        const genres = toArrayOfNumbers(body.genre);
        const authors = toArrayOfNumbers(body.author);
        const extension = getExtension(request.files.music.name);
        const music = new musicsDatabase.Music(body.name, 
                                               genres,
                                               authors,
                                               request.files.music.data,
                                               extension);

        const queries = await musicsDatabase.connect();
        await queries.addMusic(music, progress => {
            console.log(`${progress}% uploaded`);
        });

        response.status(201);
        response.end();
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
        const music = await queries.getMusicByID(request.params.id);

        const { id, name } = music;
        const url = music.calculateFileURL();
        response.status(200).json({ id, name, url }).end();
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
        const musics = await queries.getAllMusics();
        if (musics === null)
            return response.status(204).json([]).end();

        const withFileURLs = musics.map(music => ({ id: music.id, name: music.name, url: music.calculateFileURL() }));
        response.status(200).json(withFileURLs).end();
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
            return response.status(200).end();
        return response.status(404).end();
    } catch (error) {
        next(error);
    }
};


const getExtension = fileName => {
    const groups = fileName.match(/.*(\..+)/);
    if (groups.length >= 1) return groups[groups.length - 1];
    return ""
}

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

module.exports = { add, getByID, getAll, deleteMusic }
