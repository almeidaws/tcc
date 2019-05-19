/**
 * @fileOverview contains queries used on the database.
 * @author Gustavo Amaral
 */

'use strict';

/** 
 * The SQL query used to get all genres from the database.
 * @constant
 * @type {string}
 */
const getAllGenresSQL = 'SELECT ID, Name FROM Genre;';

/**
 * Exports several object that contains several SQL queries used on the project.
 * @module DatabaseQueries
 */
module.exports = { 
    getAllGenresSQL,
};
