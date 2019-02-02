'user strict';

/**
 * @fileOverview contains types and functions used to perform queries on the database.
 *
 * @author Gustavo Amaral
 *
 * @requires NPM:pg
 * @requires NPM:joi
 * @requires NPM:./database_queries.js
 */

const { Pool } = require('pg');
const Joi = require('joi');
const pool = new Pool();
const { createUserTableSQL, addUserSQL } = require('./database_queries.js');

/**
 * Entity used to hold user's data and do the validation of that data
 * when handling the database.
 * @class
 *
 * @constructor
 * @param {string} name user's name. Example: Paulo Costa.
 * @param {string} email user's email. Example: paulo@gmail.com.
 * @param {string} password hashed user's password.
 *
 * @property name user's name. Example: Gustavo Amaral
 * @property email user's email. Example: almeidaws@outlook.com
 * @property password user's password. This password isn't stored as a plain
 * string, but it's a hash value when storing and retrieving from database.
 */
class User {
    constructor(name, email, password) {
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
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        };
        return Joi.validate(this, scheme);
    }
}

/** Adds a user of type {@link User} to the data base with an autogenerated
 * number ID for that user.
 *
 * @param {User} user the user to be added to the database persistently.
 * @returns {Promise} the promise's result is an object response from 
 * database, so you can access the generated user ID by 'response.rows[0]'
 * supossing that you called the result from promise 'response'. That value
 * is a number.
 */
const addUser = (user) => {
    const { error, validatedUser } = user.validate();
    if (error) return Promise.reject(error);
    
    const addUserConfig = {
        text: addUserSQL,
        values: [user.name, user.email, user.password],
    };

    return pool.query(addUserConfig);
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
const connect = () => {
    const promise = pool.query(createUserTableSQL).then(response => ({ addUser }) )
    return promise
};

/**
 * Exports an object that currently can be used to constructs users and establishes
 * a connection with the database.
 * @module DatabaseModule
 * @exports DatabaseModule
 */
module.exports = { User, connect };
