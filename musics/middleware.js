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
        // Get's music's file
        const musicFileStream = createMusicFileStream(request);
        const body = request.body;
        
        // Get's music metadata
        const genres = toArrayOfNumbers(body.genre);
        const authors = toArrayOfNumbers(body.author);
        const music = new musicsDatabase.Music(body.name, 
                                               genres,
                                               authors,
                                               musicFileStream);

        const queries = await musicsDatabase.connect();
        await queries.addMusic(music, progress => {
            console.log(`${progress} uploaded`);
        });

        response.status(200);
        response.end();
    } catch (error) {
        next(error);
    }
}

/**
 * Gets the music stream from a request and return a readable stream
 * from it. If there's an error a HTTP error is thrown.
 *
 * @param {Pool.request} request received from the requisition.
 */
const createMusicFileStream = request => {
    if (!request.files.music)
        throw createError(401, "There's no music file");

    const buffer = request.files.music.data;
    return createFileStream(buffer);
};

/**
 * Transform a buffer to a Readable stream and return it.
 * @returns {Readable} Readable stream created from agument buffer.
 */
const createFileStream = buffer => {
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    return readable;
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

module.exports = { add }
