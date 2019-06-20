'use strict';

require("@babel/polyfill");
const _ = require('underscore');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

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
const createClient = Database.createClient;
const { createSessionTableSQL, 
        deleteSessionTableSQL,
        addSessionSQL,
        getSessionSQL,
        deleteSessionSQL,
      } = require('./database_queries.js');

/**
 * Entity used to query sessions from Session table on the database.
 * It's also a namespace that contains static functions directly related
 * the sessions handling.
 *
 * @class
 * @constructor
 * @param {uuid} uuid uuidv4 code used as token, visible to the client, to
 * identify a session.
 * @param {number} userID user's id already registed on the users table.
 * @param {Date} expiratoin when the token will expired.
 */
class Session {
    constructor(uuid, userID, expiration) {
        this.uuid = uuid;
        this.userID = userID;
        this.expiration = expiration;
    }

    /**
     * Returns a plain object with the properties 'error' and 'value' mutually
     * defined. The value contains the same session from the parameter when it's
     * properties are all valid.
     */
    static validate(session) {
        const scheme = {
            uuid: Joi.string().guid('uuidv4').required(),
            userID: Joi.number().integer().min(1).required(),
            expiration: Joi.date().required(),
        };
        return Joi.validate(session, scheme);
    }
};

/** Adds a session of type {@link Session} to the database. The data are 
 * validated before adding to the database.
 *
 * @param {Session} session the session to be added to the database persistently.
 */
const addSession = async (session) => {
    const { error, value: validatedSession } = Session.validate(session);
    if (error) return Promise.reject(error);

    const client = createClient();
    await client.connect();

    const addSessionConfig = {
        text: addSessionSQL,
        values: [validatedSession.uuid, validatedSession.userID, validatedSession.expiration],
    };

    const result = await client.query(addSessionConfig);
    await client.end();
    return result;
};

/**
 * Retrieves a an existing token from the database based on its token. It's 
 * an async function.
 *
 * If there's no session with the given token an HTTP 401 error is throw.
 *
 * @param {string} token session's token.
 * @returns {Session} the session with that token.
 */
const getSession = async token => {
    const query = {
        text: getSessionSQL,
        values: [token],
    };
    const client = createClient();
    await client.connect();


    const result = await client.query(query);
    await client.end();
    if (result.rows.length == 0)
        throw createError(401, 'Session is invalid, please login again.');

    const { userid: userID, expiration } = result.rows[0];
    return new Session(token, userID, expiration);
};

/**
 * Removes a session from the database. It's an async function.
 * It's also a function that returns nothing besides the Promise
 * from it's async nature.
 * @param {string} session's UUID used as token.
 */
const deleteSession = async token => {
    const query = {
        text: deleteSessionSQL,
        values: [token],
    };

    const client = createClient();
    await client.connect();
    await client.query(query);
    await client.end();
};

/**
 * @typedef {Object} Connection
 * @property {addUser} addUser used to inserts a new user into database.
 */

/**
 * @typedef {Object} Database
 * @property {User} User class used as entity to handle CRUD related to the user.
 * @property {Connect
 */

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
        addSession,
        getSession,
        deleteSession,
    };
    return queries;
};

const disconnect = async () => {
    await pool.end();
};

const createSessionTable = async () => await pool.query(createSessionTableSQL);
const deleteSessionTable = async () => await pool.query(deleteSessionTableSQL);

/**
 * Exports an object that currently can be used to constructs users and establishes
 * a connection with the database.
 * @module DatabaseModule
 * @exports DatabaseModule
 */
module.exports = { 
    Session,
    connect, 
    disconnect,
    DDL: { 
        createSessionTable,
        deleteSessionTable,
    },
};
