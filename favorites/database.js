'use strict';

require("@babel/polyfill");
const _ = require('underscore');
const createError = require('http-errors');

const { Database } = require('../configs.js');
const Joi = require('joi');
const pool = Database.pool();
const { addAuthorSQL, 
        deleteAuthorSQL,
        cleanUpAuthorTableSQL,
        getAllAuthorsSQL,
        getAllAuthorsFromMusicSQL,
        getAuthorByIDSQL,
        createAuthorTableSQL,
        deleteAuthorTableSQL,
      } = require('./database_queries.js');
const { connect: connectMusics } = require('../musics/database.js');

/**
 * Entity used to hold author's data and do the validation of that data
 * when handling the database. 
 *
 * This entity has two possible constructor. The first was created to 
 * receive data from database. It receives the author's id and name.
 *
 * The second was created to be used when receiving a author from the client.
 * The unique parameter is author's name.
 */
class Author {
    constructor(id, name) {
        // This is a hard implementation of constructor overloading...
        if (arguments.length === 1) {
            this.id = null;
            this.name = id ? id.trim() : id;
        } else {
            this.id = id;
            this.name = name.trim();
        }
    }

    /**
     * Checks the the Author's fields are valid to be added to the
     * database or not.
     *
     * @returns {ValidationResult}
     */
    validate() {
        const scheme = {
            id: Joi.number().integer().min(1).allow(null).required(),
            name: Joi.string().min(3).max(40).required(),
        };
        return Joi.validate(this, scheme);
    }
}

/** 
 * Adds an Author of type {@link Author} to the database with an autogenerated
 * number ID for that.
 *
 * The data is validate before adding to the database.
 *
 * @param {Author} music the music to be added to the database persistently.
 * @returns {Number} added author's id generated by database.
 */
const addAuthor = async (author) => {
    // Validate the author
    const { error, validatedUser } = author.validate();
    if (error) return Promise.reject(error);
    
    const allAuthors = await getAllAuthors();
    const matches = allAuthors.filter(a => a.name.toLowerCase() === author.name.toLowerCase());
    if (matches.length > 0) return matches[0];

    // Add author in database
    const addAuthorConfig = {
        text: addAuthorSQL,
        values: [author.name],
    };
    const result = await pool.query(addAuthorConfig);
    const tuple = result.rows[0];
    return new Author(tuple.id, tuple.name);
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
        addAuthor, 
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
    Author, 
    connect, 
    disconnect,
    DDL: {
        createAuthorTable,
        deleteAuthorTable,
        cleanUpAuthorTable,
    },
};
