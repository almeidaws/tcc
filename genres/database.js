'use strict';

require("@babel/polyfill");
const _ = require('underscore');
const createError = require('http-errors');

const { Database } = require('../configs.js');
const Joi = require('joi');
const pool = Database.pool();
const { getAllGenresSQL } = require('./database_queries.js');

/**
 * This entity is used to only to store values retrieved from the database.
 * It's not necessary to validate because genres are added on database's migration.
 */
class Genre {
    constructor(id, name) {
        this.id = id;
        this.name = name.trim();
    }
}

/**
 * Retrieves all genres from database base with id and name of each one.
 *
 * @returns {Array<Genre>} the return is an array of objects with 'id' and 'name' properties.
 */
const getAllGenres = async () => {
    const getAllGenresConfig = {
        text: getAllGenresSQL,
    };

    const result = await pool.query(getAllGenresConfig);
    const genres = result.rows.map(result => new Genre(result.id, result.name));
    return genres;
};

const connect = async () => {
    const queries = { getAllGenres };
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
    Genre, 
    connect, 
    disconnect,
};