'use strict';

require("@babel/polyfill");
const _ = require('underscore');
const createError = require('http-errors');
const { upload: uploadToS3 } = require('../s3/s3.js');
const normalizeForSearch = require('normalize-for-search');

/**
 * @fileOverview contains types and functions used to perform queries on the database.
 *
 * @author Gustavo Amaral
 *
 * @requires NPM:pg
 * @requires NPM:joi
 * @requires NPM:./database_queries.js
 */
const { Database } = require('../configs.js');
const Joi = require('joi');
const pool = Database.pool();
const { createGenreTableSQL, 
        pupulateGenreTableSQL,
        createAuthorTableSQL,
        createMusicTableSQL,
        createMusicGenreTableSQL,
        createMusicAuthorTableSQL, 
        findMusicByNormalizedFileKeySQL, 
        addMusicSQL,
        addMusicAuthorSQL,
        addMusicGenreSQL,
      } = require('./database_queries.js');

/**
 * Entity used to hold music's data and do the validation of that data
 * when handling the database. 
 *
 * This entity has two possible constructor. The first was created to 
 * receive data from database. It receives the musics's id, name and fileS3Key.
 * The fileS3Key the the value used to retrieve music's file from Amazon S3. It's
 * global.
 *
 * Two musics are equal if the have the same name and authors.
 *
 * The second was created to be used when receiving a music from the client.
 * The parameters are music's name, genres that is an array if integers,
 * the authors of the same type as genres and the readable stream to the
 * music's file.
 */
class Music {
    constructor(name, genres, authors, musicStream) {
        // This is a hard implementation of constructor overloading...
        if (arguments.length === 3) {
            this.id = name;
            this.name = genres;
            this.fileS3Key = authors;
        } else {
            this.id = null;
            this.name = name;
            this.genres = genres;
            this.authors = authors;
            this.musicStream = musicStream;
            this.fileS3Key = calculateMusicFileS3Key(name, authors);
        }
    }

    /**
     * Checks the the music's fields are valid to be added to the
     * database or not.
     *
     * @returns {ValidationResult}
     */
    validate() {
        const scheme = {
            id: Joi.number().integer().min(1).allow(null).required(),
            name: Joi.string().min(3).max(30).required(),
            genres: Joi.array().items(Joi.number().min(0).max(15)).min(1).max(4).required(),
            authors: Joi.array().items(Joi.number().min(1).max(25)).min(1).max(4).required(),
            musicStream: Joi.object().optional(),
            fileS3Key: Joi.string().min(1).max(100).required(),
        };
        return Joi.validate(this, scheme);
    }
}

/** Adds a music of type {@link Music} to the database with an autogenerated
 * number ID for that. It also adds the music's file to the Amazon S3.
 *
 * The data is validate before adding to the database.
 *
 * @param {Music} music the music to be added to the database persistently.
 * @param {Function} a callback colled to track music's file uploading progress. This
 * is a value between 0 and 100.
 */
const addMusic = async (music, progressCallback) => {
    // Validate the music
    const { error, validatedUser } = music.validate();
    if (error) return Promise.reject(error);
    
    // Checks if the music is repeated
    const repeatedMusic = await findMusicByNameAndAuthors(music.name, music.authors);
    if (repeatedMusic) {
        const error = createError(409, 'This music already exists');
        return Promise.reject(error);
    }

    // Upload file to S3 Storage
    await uploadToS3(music.fileS3Key, music.fileStream, (bytesUploaded, totalBytes) => {
        const progress = bytesUploaded / totalBytes * 100
        if(progressCallback) progressCallback(progress)
    });

    // Add music in database
    const addMusicConfig = {
        text: addMusicSQL,
        values: [music.name, music.fileS3Key],
    };
    const result = await pool.query(addMusicConfig);
    const musicID = result.rows[0].id;

    // Add relation of music with authors in database
    music.authors.forEach(async author => {
        const addMusicAuthorConfig = {
            text: addMusicAuthorSQL,
            values: [musicID, author],
        };
        await pool.query(addMusicAuthorConfig);
    });

    // Add relation of music with genres in database
    music.genres.forEach(async genre => {
        const addMusicGenreConfig = {
            text: addMusicGenreSQL,
            values: [musicID, genre],
        };
        await pool.query(addMusicGenreConfig);
    });
};

/**
 * Returns the music from database given its name and authors.
 * 
 * This method is async, so you should use the async/await or Promise
 * syntax.
 *
 * @param {string} music's name.
 * @param {Array<Number>} an array with all authors codes.
 * @param {Promise} found music.
 */
const findMusicByNameAndAuthors = async (name, authors) => {
    // Configures query
    const query = {
        text: findMusicByNormalizedFileKeySQL,
        values: [calculateMusicFileS3Key(name, authors)],
    };

    // Gets the music
    const result = await pool.query(query);
    if (result.rows.length != 1) return null;

    // Parses and return it
    const { id, name: musicName, fileS3Key } = result.rows[0];
    return new Music(id, nameName, fileS3Key);
}

/**
 * Generate a string value that will be used to add a music to the database
 * give its name and array of authors code.
 */
const calculateMusicFileS3Key = (name, authors) => normalizedName(name) + normalizedAuthors(authors);

/**
 * Remove special characters from the music's name normalizing it.
 */
const normalizedName = name => normalizeForSearch(name);
/**
 * Converts the array of integers into a string of authors codes.
 */
const normalizedAuthors = authors => authors.sort((a, b) => a - b).toString();

/**
 * Establishes a connection to the database that can be used to perform queries.
 * 
 * The returned valued from promise is a {@link Connection}.
 *
 * @returns {Promise} the promise's result is an object with queries that can be used to 
 * communicates with the database.
 */
const connect = async () => {
    const queries = { addMusic, };
    await createMusicTable();
    await createGenreTable();
    await populateGenreTable();
    await createMusicGenreTable();
    await createAuthorTable();
    await createMusicAuthorTable();
    return queries;
};

const createMusicTable = async () => await pool.query(createMusicTableSQL);
const createGenreTable = async () => await pool.query(createGenreTableSQL);
const populateGenreTable = async () => await pool.query(pupulateGenreTableSQL);
const createMusicGenreTable = async () => await pool.query(createMusicGenreTableSQL);
const createAuthorTable = async () => await pool.query(createAuthorTableSQL);
const createMusicAuthorTable = async () => await pool.query(createMusicAuthorTableSQL);
const deleteMusicTable = async () => await pool.query(deleteUserTableSQL);

/**
 * Exports an object that currently can be used to constructs users and establishes
 * a connection with the database.
 * @module DatabaseModule
 * @exports DatabaseModule
 */
module.exports = { 
    Music, 
    connect, 
    DDL: { 
        createMusicTable, 
        deleteMusicTable,
    },
};
