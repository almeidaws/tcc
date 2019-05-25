'use strict';

if (!process.env.NODE_ENV) throw new Error('You must set the NODE_ENV environment variable');

require("@babel/polyfill");
const _ = require('underscore');
const createError = require('http-errors');
const uuidv4 = require('uuid/v4');
const testing = process.env.NODE_ENV === 'test';
const { 
    upload: uploadToS3, 
    deleteObject: deleteFromS3, 
    fileURLForKey 
} = require(testing ? '../s3/s3_mock.js' : '../s3/s3.js');
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
const { addMusicSQL,
        addMusicAuthorSQL,
        addMusicGenreSQL,
        deleteMusicAuthorSQL,
        deleteMusicGenreSQL,
        deleteMusicSQL,
        cleanUpMusicAuthorTableSQL,
        cleanUpMusicGenreTableSQL,
        cleanUpMusicTableSQL,
        getMusicByIDSQL,
        getMusicsByAuthorSQL,
        createMusicTableSQL,
        createMusicGenreTableSQL,
        createMusicAuthorTableSQL, 
        findMusicByNormalizedFileKeySQL, 
        getAllMusicsSQL,
        deleteMusicAuthorTableSQL,
        deleteMusicGenreTableSQL,
        deleteMusicTableSQL,
      } = require('./database_queries.js');

/**
 * Entity used to hold music's data and do the validation of that data
 * when handling the database. 
 *
 * This entity has two possible constructor. The first was created to 
 * receive data from database. It receives the musics's id, name, fileS3Key, posterUID and duration in seconds.
 * The fileS3Key the the value used to retrieve music's file from Amazon S3. It's
 * global. The posterUID is also used to retrieve the music's poster from Amazon S3 and
 * it's also global.
 *
 * Two musics are equal if the have the same name, authors and file's extension.
 * In this comparison, music's name is normalized removing diacritcs, 
 * accents and spaces.
 *
 * The second was created to be used when receiving a music from the client.
 * The parameters are music's name, genres that is an array if integers,
 * the authors of the same type as genres, the buffer with the music in it, 
 * the file's extension, the poster buffer, the poster's extension and music's duration in seconds.
 */
class Music {
    constructor(name, genres, authors, fileBuffer, fileExtension, posterBuffer, posterExtension, duration) {
        // This is a hard implementation of constructor overloading...
        if (arguments.length === 5) {
            this.id = name;
            this.name = genres;
            this.fileS3Key = authors;
            this.posterUID = fileBuffer;
            this.duration = fileExtension;
        } else {
            this.id = null;
            this.name = name ? name.trim() : name;
            this.genres = genres;
            this.authors = authors;
            this.fileBuffer = fileBuffer;
            this.extension = fileExtension.trim();
            this.posterBuffer = posterBuffer;
            this.duration = duration;
            this.posterUID = uuidv4() + posterExtension;
            this.calculateFileS3Key();
        }
    }

    /**
     * Generates a key that will be used when persisting this music into Amazon S3.
     * This value is stored in a property called 'fileS3Key'.
     */
    calculateFileS3Key() {
        this.fileS3Key = this.name ? calculateMusicFileS3Key(this.name, this.authors, this.extension) : null;
    }

    /**
     * Returns the public URL that can be used to download music's file.
     */
    calculateFileURL() { return fileURLForKey(this.fileS3Key); }

    /**
     * Returns the public URL that can be used to download music's poster.
     */
    calculatePosterURL() { return fileURLForKey(this.posterUID); }

    /**
     * Checks the the music's fields are valid to be added to the
     * database or not.
     *
     * @returns {ValidationResult}
     */
    validate() {
        const scheme = {
            id: Joi.number().integer().min(1).allow(null).required(),
            name: Joi.string().min(3).max(40).required(),
            genres: Joi.array().items(Joi.number().min(0)).min(1).max(4).required(),
            authors: Joi.array().items(Joi.number().min(1)).min(1).max(4).required(),
            extension: Joi.string().min(1).max(4).required(),
            fileBuffer: Joi.object().optional(),
            posterBuffer: Joi.object().optional(),
            fileS3Key: Joi.string().min(1).max(100).required(),
            posterUID: Joi.string().min(1).max(100).required(),
            duration: Joi.number().precision(6).min(1).max(1200).required(),
        };
        return Joi.validate(this, scheme);
    }
}

/** Adds a music of type {@link Music} to the database with an autogenerated
 * number ID for that. It also adds the music's file to the Amazon S3.
 *
 * The data is validated before adding to the database.
 *
 * @param {Music} music the music to be added to the database persistently.
 * @param {Function} a callback colled to track music's file uploading progress. This
 * is a value between 0 and 100.
 * @returns {Music} copy of added music with the id property setted.
 */
const addMusic = async (music, progressCallback) => {
    // Validate the music
    const { error, validatedMusic } = music.validate();
    if (error) return Promise.reject(error);
    
    // Checks if the music is repeated
    const repeatedMusic = await findMusicByFileKey(music.name, music.authors, music.extension);
    if (repeatedMusic) {
        const error = createError(409, 'This music already exists');
        return Promise.reject(error);
    }

    // Upload file to S3 Storage
    await uploadToS3(music.fileS3Key, music.fileBuffer, (bytesUploaded, totalBytes) => {
        const progress = bytesUploaded / totalBytes * 100;
        if(progressCallback) progressCallback(progress)
    });

    // Upload poster to S3 Storage
    await uploadToS3(music.posterUID, music.posterBuffer, (bytesUploaded, totalBytes) => {
        const progress = bytesUploaded / totalBytes * 100;
        if(progressCallback) progressCallback(progress)
    });

    // Add music in database
    const addMusicConfig = {
        text: addMusicSQL,
        values: [music.name, music.fileS3Key, music.posterUID, music.duration],
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

    return new Music(musicID, music.name, music.fileS3Key, music.posterUID, music.duration);
};

/**
 * Gets a music from database given its ID.
 * @returns {id} the return is an array of objects with 'id' and 'name' properties
 */
const getMusicByID = async (id) => {
    const getMusicByIDConfig = {
        text: getMusicByIDSQL,
        values: [id],
    };

    const result = await pool.query(getMusicByIDConfig);
    if (result.rows.length === 0)
        throw new createError(404, `There's no author with ID ${id}`);

    const { id: musicID, name, files3key: fileS3Key, posteruid: posterUID, duration } = result.rows[0];
    return new Music(musicID, name, fileS3Key, posterUID, duration);
};

/**
 * Retrieves all musics from the database with a given author ID.
 * 
 * This method is asyncronous, so you can use the Promise/async await syntax.
 * @returns {Array<Music>} musics with that author ID or an empty array if there's no one.
 */
const getMusicsByAuthor = async (authorID) => {
    const getMusicsByAuthorConfig = {
        text: getMusicsByAuthorSQL,
        values: [authorID],
    };

    const result = await pool.query(getMusicsByAuthorConfig);
    return result.rows.map(row => new Music(row.id, row.name, row.files3key, row.posteruid, row.duration));
};

/**
 * Retrieves all musics from database as an array of Music type.
 *
 * This method is async, so you should use the async/await or Promise
 * syntax.
 */
const getAllMusics = async () => {
    const query = { text: getAllMusicsSQL };

    const result = await pool.query(query);
    if (result.rows.length === 1) return null;
    const musics = result.rows.map(music => new Music(music.id, 
                                                      music.name, 
                                                      music.files3key, 
                                                      music.posteruid, 
                                                      music.duration));
    return musics;
 }

/** 
 * Removes a music metadata from the database and its file from Amazon S3.
 * This methods also removes from the associative table MusicAuthor and MusicGenre.
 *
 * The data is validated before adding to the database.
 *
 * @param {number} music's id.
 * @returns {boolean} true if the music has been deleted or false otherwise.
 */
const deleteMusic = async (id) => {
    
    let music;
    try {
        music = await getMusicByID(id);
    } catch (error) {
        return false;
    }

    await deleteFromS3(music.fileS3Key);
    await deleteFromS3(music.posterUID);
    await pool.query({ text: deleteMusicGenreSQL, values: [music.id] });
    await pool.query({ text: deleteMusicAuthorSQL, values: [music.id] });
    await pool.query({ text: deleteMusicSQL, values: [music.id] });
    
    return true;
};

/**
 * Returns the music from database given its name and authors.
 * 
 * This method is async, so you should use the async/await or Promise
 * syntax.
 *
 * @param {string} music's name.
 * @param {Array<Number>} an array with all authors codes.
 * @param {string} music's extension.
 * @param {Promise} found music.
 */
const findMusicByFileKey = async (name, authors, extension) => {
    // Configures query
    const query = {
        text: findMusicByNormalizedFileKeySQL,
        values: [calculateMusicFileS3Key(name, authors, extension)],
    };

    // Gets the music
    const result = await pool.query(query);
    if (result.rows.length != 1) return null;

    // Parses and return it
    const { id, name: musicName, files3key: fileS3Key, posteruid: posterUID, duration } = result.rows[0];
    return new Music(id, musicName, fileS3Key, posterIUD, duration);
}

/**
 * Generate a string value that will be used to add a music to the database
 * give its name, array of authors codes and music's file extension.
 */
const calculateMusicFileS3Key = (name, authors, extension) => {
    return normalizedName(name) + normalizedAuthors(authors) + extension;
};

/**
 * Remove special characters from the music's name normalizing it.
 */
const normalizedName = name => normalizeForSearch(name).replace(/\s/g,'');
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
    const queries = { 
        addMusic, 
        getMusicByID,
        getAllMusics,
        getMusicsByAuthor,
        deleteMusic,
    };
    return queries;
};

const disconnect = async () => {
    await pool.end();
};

const createMusicTable = async () => {
    await pool.query(createMusicTableSQL);
    await pool.query(createMusicAuthorTableSQL);
    await pool.query(createMusicGenreTableSQL);
};

const deleteMusicTable = async () => {
    await pool.query(deleteMusicGenreTableSQL);
    await pool.query(deleteMusicAuthorTableSQL);
    await pool.query(deleteMusicTableSQL);
}

const cleanUpMusicTable = async () => {
    await pool.query(cleanUpMusicGenreTableSQL);
    await pool.query(cleanUpMusicAuthorTableSQL);
    await pool.query(cleanUpMusicTableSQL);
}

/**
 * Exports an object that currently can be used to constructs users and establishes
 * a connection with the database.
 * @module DatabaseModule
 * @exports DatabaseModule
 */
module.exports = { 
    Music, 
    connect, 
    disconnect,
    DDL: { 
        createMusicTable, 
        deleteMusicTable,
        cleanUpMusicTable,
    },
};
