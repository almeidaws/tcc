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
const addAuthorSQL = 'INSERT INTO Author (Name) VALUES ($1) RETURNING ID, Name;';

/** 
 * The SQL query used to get all authors from the database.
 * @constant
 * @type {string}
 */
const getAllAuthorsSQL = 'SELECT ID, Name FROM Author;';


/** 
 * The SQL query used to create the Author table. It was created to be used
 * in automatic tests.
 * @constant
 * @type {string}
 */
const createAuthorTableSQL = `
CREATE TABLE IF NOT EXISTS Author (
    ID serial NOT NULL PRIMARY KEY,
    Name text NOT NULL
);
`;

/** 
 * The SQL query used to delete the Author table. It was created to be used
 * in automatic tests.
 * @constant
 * @type {string}
 */
const deleteAuthorTableSQL = "DROP TABLE Author";

/** 
 * The SQL query used to get an author by ID. It was created to be used
 * in automatic tests.
 * @constant
 * @type {string}
 */
const getAuthorByIDSQL = "SELECT ID, Name FROM Author WHERE ID = $1;"; 

/**
 * Exports several object that contains several SQL queries used on the project.
 * @module DatabaseQueries
 */
module.exports = { 
    addAuthorSQL,
    getAllAuthorsSQL,
    getAuthorByIDSQL,
    createAuthorTableSQL,
    deleteAuthorTableSQL,
};
