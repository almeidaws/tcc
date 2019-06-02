'use strict';

require("@babel/polyfill");
const _ = require('underscore');
const createError = require('http-errors');

const { Database } = require('../configs.js');
const Joi = require('joi');
const pool = Database.pool();
const { addFavoriteSQL,
        getAllFavoriteFromUserSQL,
        deleteFavoriteQL,
      } = require('./database_queries.js');

/**
 * Entity used to hold Favorite's data and do the validation of that data
 * when handling the database. 
 */
class Favorite {
    constructor(userID, musicID) {
        this.userID = userID;
        this.musicID = musicID;
    }

    /**
     * Checks the the Favorite's fields are valid to be added to the
     * database or not.
     *
     * @returns {ValidationResult}
     */
    validate() {
        const scheme = {
            userID: Joi.number().integer().min(1).allow(null).required(),
            musicID: Joi.number().integer().min(1).allow(null).required(),
        };
        return Joi.validate(this, scheme);
    }
}

/** 
 * Adds a Favorite of type {@link Favorite}.
 *
 * The data is validate before adding to the database.
 *
 * @param {Favorite} favorite the favorite to be added to the database persistently.
 * @returns {Favorite} added favorite's.
 */
const addFavorite = async (favorite) => {
    // Validate the favorite
    const { error, validatedFavorite } = favorite.validate();
    if (error) return Promise.reject(error);
    
    // Add favorite in database
    const addFavoriteConfig = {
        text: addFavoriteSQL,
        values: [favorite.userID, favorite.musicID],
    };
    const result = await pool.query(addFavoriteConfig);
    const tuple = result.rows[0];
    return new Favorite(tuple.userid, tuple.musicid);
};

/**
 * Retrieves all authors from database base with id and name of each one.
 *
 * @returns {Array<Author>} the return is an array of objects with 'id' and 'name' properties.
 */
const getAllAuthors = async () => {
    const getAllAuthorsConfig = {
        text: getAllAuthorsSQL,
    };

    const result = await pool.query(getAllAuthorsConfig);
    const authors = result.rows.map(result => new Author(result.id, result.name));
    return authors;
};

/**
 * Gets an author from database given its ID.
 *
 * @returns {Author} the return is an array of objects with 'id' and 'name' properties
 */
const getAuthorByID = async (id) => {
    const getAuthorByIDConfig = {
        text: getAuthorByIDSQL,
        values: [id],
    };

    const result = await pool.query(getAuthorByIDConfig);
    if (result.rows.length == 0)
        throw new createError(404, `There's no author with ID ${id}`);

    const tuple = result.rows[0];
    return new Author(tuple.id, tuple.name);
};

/**
 * Gets all authors from form a music from the database.
 *
 * @returns {Author} the return is an array of objects with 'id' and 'name' properties
 */
const getAuthorsByMusic = async (musicID) => {
    const getAuthorsByMusicConfig = {
        text: getAllAuthorsFromMusicSQL,
        values: [musicID],
    };

    const result = await pool.query(getAuthorsByMusicConfig);

    const authors = result.rows.map(row => new Author(row.id, row.name));
    return authors;
};

/** 
 * Removes a author from the database by ID. This function checks if 
 * the author hasn't a music associated with it. If that is the case,
 * the author isn't removed.
 *
 * @param {number} author's id.
 * @returns {Array} musics that has relation with this author in the database.
 */
const deleteAuthor = async (id) => {
    
    const { getMusicsByAuthor } = await connectMusics();
    const obstacles = await getMusicsByAuthor(id);

    if (obstacles.length > 0)
        return obstacles;

    const deleteAuthorConfig = {
        text: deleteAuthorSQL,
        values: [id],
    };

    await pool.query(deleteAuthorConfig);
    return [];
};

const createAuthorTable = async () => pool.query(createAuthorTableSQL);
const deleteAuthorTable = async () => pool.query(deleteAuthorTableSQL);
const cleanUpAuthorTable = async () => pool.query(cleanUpAuthorTableSQL);

const connect = async () => {
    const queries = { 
        addFavorite, 
        getAllAuthors,
        getAuthorByID,
        getAuthorsByMusic,
        deleteAuthor,
    };
    return queries;
};

const disconnect = async () => {
    await pool.end();
};

/**
 * Exports an object that currently can be used to constructs users and establishes
 * a connection with the database.
 * @module DatabaseModule
 * @exports DatabaseModule
 */
module.exports = { 
    Favorite, 
    connect, 
    disconnect,
    DDL: {
        createAuthorTable,
        deleteAuthorTable,
        cleanUpAuthorTable,
    },
};
