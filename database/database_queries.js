/**
 * @fileOverview contains queries used on the database.
 * @author Gustavo Amaral
 */

'user strict';

/**
 * The SQL query to create the user's table. The table is created
 * only if it not exists.
 * @constant
 * @type {string}
 */
const createUserTableSQL = 
`CREATE TABLE IF NOT EXISTS Users (
    ID serial NOT NULL PRIMARY KEY, 
    Name text NOT NULL, 
    Email text NOT NULL, 
    Password text NOT NULL 
)`;

/**
 * The SQL query used to add a user to the table Users. It's not the final query because it has
 * three parameters: user's name, email and password. This parameters should be used with 
 * 'pg' node module.
 * @constant
 * @type {string}
 */
const addUserSQL = 'INSERT INTO Users (Name, Email, Password) VALUES ($1, $2, $3) RETURNING ID';

/**
 * Exports several object that contains several SQL queries used on the project.
 * @module DatabaseQueries
 */
module.exports = { createUserTableSQL, addUserSQL };
