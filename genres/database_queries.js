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
 * The SQL query used to get all genres from a music.
 * @constant
 * @type {string}
 */
const getAllGenresFromMusicSQL = 'SELECT ID, Name FROM Genre INNER JOIN MusicGenre ON ID = Genre WHERE Music = $1;';

/**
 * Exports several object that contains several SQL queries used on the project.
 * @module DatabaseQueries
 */
module.exports = { 
    getAllGenresSQL,
    getAllGenresFromMusicSQL
};
