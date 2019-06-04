'use strict';

require("@babel/polyfill");
const _ = require('underscore');
const createError = require('http-errors');

const { Database } = require('../configs.js');
const Joi = require('joi');
const pool = Database.pool();
const { addListeningSQL,
        getLastListenedMusicsSQL,
      } = require('./database_queries.js');
const { Music } = require('../musics/database.js');

/**
 * Entity used to hold Favorite's data and do the validation of that data
 * when handling the database. 
 */
class Listening {
    constructor(musicID) {
        this.musicID = musicID;
    }

    /**
     * Checks the the Listening's fields are valid to be added to the
     * database or not.
     *
     * @returns {ValidationResult}
     */
    validate() {
        const scheme = {
            musicID: Joi.number().integer().min(1).required(),
        };
        return Joi.validate(this, scheme);
    }
}

/** 
 * Adds a Listening of type {@link Listening}.
 *
 * The data is validate before adding to the database.
 *
 * @param {Listening} listening the listening to be added to the database persistently.
 * @returns {Listening} added favorite's.
 */
const addListening = async (listening) => {
    // Validate the favorite
    const { error, validatedListening } = listening.validate();
    if (error) return Promise.reject(error);
    
    // Add listening in database
    const addListeningConfig = {
        text: addListeningSQL,
        values: [listening.musicID],
    };

    const result = await pool.query(addListeningConfig);
    const tuple = result.rows[0];
    return new Listening(tuple.musicid);
};

/**
 * Gets last musics listened on the website.
 *
 * @returns {Array<Music>} the return is an array of musics.
 */
const getLastListenedMusics = async (userID) => {
    const getLastListenedMusicsConfig = { text: getLastListenedMusicsSQL, }; 

    const result = await pool.query(getLastListenedMusicsConfig);
    return result.rows.map(row => new Music(row.id, row.name, row.files3key, row.posteruid, row.duration));
};

const connect = async () => {
    const queries = { 
        addListening,
        getLastListenedMusics
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
    Listening, 
    connect, 
    disconnect,
};
