/**
 * @fileOverview contains queries used on the database.
 * @author Gustavo Amaral
 */

'use strict';

/** 
 * The SQL query used to add an author to the database.
 * @constant
 * @type {string}
 */
const addAuthorSQL = 'INSERT INTO Author (Name) VALUES ($1) RETURNING ID';

/** 
 * The SQL query used to get all authors from the database.
 * @constant
 * @type {string}
 */
const getAllAuthorsSQL = 'SELECT ID, Name FROM Author;';

/**
 * Exports several object that contains several SQL queries used on the project.
 * @module DatabaseQueries
 */
module.exports = { 
    addAuthorSQL,
    getAllAuthorsSQL,
};
