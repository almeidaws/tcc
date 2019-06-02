'use strict';

require("@babel/polyfill");
const _ = require('underscore');
const createError = require('http-errors');

const { Database } = require('../configs.js');
const Joi = require('joi');
const pool = Database.pool();
const { addFavoriteSQL,
        getAllFavoriteFromUserSQL,
        deleteFavoriteSQL,
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

    const result = await pool.query(getFavoritesByUserIDConfig);
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

    const result = await pool.query(deleteFavoriteConfig);
    return result.rowCount >= 1;
};

const connect = async () => {
    const queries = { 
        addFavorite, 
        deleteFavorite,
        getFavoritesByUserID,
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
