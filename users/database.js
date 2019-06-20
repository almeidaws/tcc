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
const uuidv4 = require('uuid/v4');
const pool = Database.pool();
const createClient = Database.createClient;
const { createUserTableSQL, 
        deleteUserTableSQL, 
        addUserSQL,
        getUserSQL,
        authUserSQL,
      } = require('./database_queries.js');

/**
 * Entity used to hold user's data and do the validation of that data
 * when handling the database. It's also a namespace that contains 
 * functions related directly to the user.
 *
 * When creating a new user you can omit the user's id. If you do that
 * or set to `undefined`, this property will setted to `null`.
 *
 * @class
 *
 * @constructor
 * @param {number} id user's unique id. Example: 3.
 * @param {string} name user's name. Example: Paulo Costa.
 * @param {string} email user's email. Example: paulo@gmail.com.
 * @param {string} password hashed user's password.
 *
 * @property id user's name. Example: 1.
 * @property name user's name. Example: Gustavo Amaral
 * @property email user's email. Example: almeidaws@outlook.com
 * @property password user's password. This password isn't stored as a plain
 * string, but it's a hash value when storing and retrieving from database.
 */
class User {
    constructor(id, name, email, password) {
        if (_.isString(id)) {
            password = email;
            email = name;
            name = id;
            id = null;
        }

        if (id === undefined) id = null;
            
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    /**
     * @typedef {Object} ValidationResult
     * @prop {User} value the successful validated user.
     * @prop {Error} error if the user's data is invalid, this property contais the error with
     * the invalid data description.
     */

    /**
     * Checks the the user's fields are valid to be added to the
     * database or not.
     *
     * @returns {ValidationResult}
     */
    validate() {
        const scheme = {
            id: Joi.number().integer().min(1).allow(null).required(),
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        };
        return Joi.validate(this, scheme);
    }

    /**
     * Returns a promises whose result is a hashed password that can be stored on be password.
     * 
     * You must to hash the password before saving it to the database for security reasons.
     *
     * @param {string} password user's plain password.
     * @returns {string} hashed password.
     */
    static async hashPassword(password) { return await bcrypt.hash(password, 10) }

    /**
     * Returns `true` if the a plain password is equal to its hashed version or `false` otherwise.
     *
     * You should't compares two hashed password, instead this function should be used to successfully
     * compared a plain text password with a hashed one.
     *
     * @param {string} plainPassword plain text password received from client.
     * @param {string} hashedPassword password retrieved from database.
     */
    static async comparePasswords(plainPassword, hashedPassword) { return await bcrypt.compare(plainPassword, hashedPassword) }
}

/** Adds a user of type {@link User} to the data base with an autogenerated
 * number ID for that user.
 *
 * The data is validate before adding to the database.
 *
 * @param {User} user the user to be added to the database persistently.
 * @returns {Promise} the promise's result is an new User with the autogenerated ID.
 */
const addUser = async (user) => {
    const { error, validatedUser } = user.validate();
    if (error) return Promise.reject(error);
    
    const repeatedUser = await findUser(user.email);
    if (repeatedUser) {
        const error = createError(409, 'An user with this email already exists');
        return Promise.reject(error);
    }

    const encryptedPassword = await User.hashPassword(user.password);
    const addUserConfig = {
        text: addUserSQL,
        values: [user.name, user.email, encryptedPassword],
    };

    const client = createClient();
    await client.connect();
    const promise = client.query(addUserConfig)
        .then(result => {
            const copy = _.clone(user);
            copy.id = result.rows[0].id;
            copy.password = encryptedPassword;
            return copy;
        });
    await client.end();
    return promise;
};

/**
 * Retrieves a new user from the database based on its ID.
 *
 * @param {number} id user's valid id.
 * @returns {Promise} the promise's result is the retrieved result. If there's
 * no user, the promise is rejected.
 */
const getUser = async id => {
    const query = {
        text: getUserSQL,
        values: [id],
    };

    const client = createClient();
    await client.connect();
    const promise = client.query(query)
        .then(result => {
            if (result.rows.length != 1) {
                const message = "There's no User with ID '" + id + "'.";
                return Promise.reject(new Error(message));  
            }
            
            const user = result.rows[0];
            
            return new User(id, user.name, user.email, user.password);
        });
    await client.end();
    return promise;
};

/**
 * Returns the authenticated user or throw an HTTP error if there's an error
 * with inexistent user or wrong email and password combination.
 *
 * This function queries the dabatase for a use using its email and checks
 * if the give password for that email is correct.
 *
 * @param {string} email user's email. The email search is case insensitive.
 * @param {string} password user's password as plain text.
 * @returns a primise whose result is a boolean value.
 */
const authUser = async (email, password) => {
    const user = await findUser(email);

    if (user === null || !(await User.comparePasswords(password, user.password))) {
        throw createError(401, 'Incorrect email or password');
    }

    return user;
}

/**
 * Returns the first user with a given email.
 * @param {string} email user's email.
 * @param {Promise} found user.
 */
const findUser = async email => {
    const query = {
        text: authUserSQL,
        values: [email.toLowerCase()],
    };

    const client = createClient();
    await client.connect();
    const result = await client.query(query);
    await client.end();
    if (result.rows.length != 1) return null;

    const { id, name, password } = result.rows[0];
    return new User(id, name, email, password);
}

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
        addUser,
        getUser,
        authUser,
    };
    return queries;
};

const disconnect = async () => {
    await pool.end();
}

const createUserTable = async () => await pool.query(createUserTableSQL);
const deleteUserTable = async () => await pool.query(deleteUserTableSQL);

/**
 * Exports an object that currently can be used to constructs users and establishes
 * a connection with the database.
 * @module DatabaseModule
 * @exports DatabaseModule
 */
module.exports = { 
    User, 
    connect, 
    disconnect,
    DDL: { 
        createUserTable, 
        deleteUserTable,
    },
};
