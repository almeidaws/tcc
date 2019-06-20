'use strict';

require("@babel/polyfill");
const _ = require('underscore');
const createError = require('http-errors');

const { Database } = require('../configs.js');
const Joi = require('joi');
const pool = Database.pool();
const createClient = Database.createClient;
const { addFavoriteSQL,
        getAllFavoriteFromUserSQL,
        deleteFavoriteSQL,
        getFavorite,
      } = require('./database_queries.js');
const { Music } = require('../musics/database.js');

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
            userID: Joi.number().integer().min(1).required(),
            musicID: Joi.number().integer().min(1).required(),
        };
        return Joi.validate(this, scheme);
    }
}

/** 
 * Check a favorite exists in the database.
 *
 * @param {Favorite} favorite the favorite to be checked.
 * @returns {Bool} true if the favorite exist or false otherwise.
 */
const checkFavorite = async (favorite) => {
    const checkFavoriteConfig = {
        text: getFavorite,
        values: [favorite.userID, favorite.musicID],
    };
    const client = createClient();
    await client.connect();
    const result = await client.query(checkFavoriteConfig);
    await client.end();
    return result.rows.length > 0;
};
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

    const client = createClient();
    await client.connect();

    // If this favorite already exists.
    if (await checkFavorite(favorite)) return null;

    const result = await client.query(addFavoriteConfig);
    await client.end();
    const tuple = result.rows[0];
    return new Favorite(tuple.userid, tuple.musicid);
};

/**
 * Gets all musics favorited by a user.
 *
 * @param {Number} userID user's id used to find the music.
 * @returns {Author} the return is an array of objects with 'id' and 'name' properties
 */
const getFavoritesByUserID = async (userID) => {
    const getFavoritesByUserIDConfig = {
        text: getAllFavoriteFromUserSQL,
        values: [userID],
    };
    const client = createClient();
    await client.connect();
    const result = await client.query(getFavoritesByUserIDConfig);
    await client.end();
    return result.rows.map(row => new Music(row.id, row.name, row.files3key, row.posteruid, row.duration));
};

/** 
 * Removes a favorite from the database.
 *
 * @param {Favorite} favorite entity with data that will be used to find the favorite row
 * on database..
 */
const deleteFavorite = async (favorite) => {
    
    const deleteFavoriteConfig = {
        text: deleteFavoriteSQL,
        values: [favorite.userID, favorite.musicID],
    };

    const client = createClient();
    await client.connect();
    const result = await client.query(deleteFavoriteConfig);
    await client.end();
    return result.rowCount >= 1;
};

const connect = async () => {
    const queries = { 
        addFavorite, 
        deleteFavorite,
        getFavoritesByUserID,
        checkFavorite,
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
};
