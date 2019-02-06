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

/** The SQL query used to delete the table user. It was originally created
 * to reset the database when performing unity tests.
 * @constant
 * @type {string}
 */
const deleteUserTableSQL = 'DROP TABLE Users';

/**
 * The SQL query to create the session's table. The table is created
 * only if it not exists.
 * @constant
 * @type {string}
 */
const createSessionTableSQL = 
`CREATE TABLE IF NOT EXISTS "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);`;

/**
 * The SQL query used to add a user to the table Users. It's not the final query because it has
 * three parameters: user's name, email and password. This parameters should be used with 
 * 'pg' node module.
 * @constant
 * @type {string}
 */
const addUserSQL = 'INSERT INTO Users (Name, Email, Password) VALUES ($1, $2, $3) RETURNING ID';

const getUserSQL = 'SELECT ID, Name, Email, Password FROM Users WHERE ID = $1';

/**
 * Exports several object that contains several SQL queries used on the project.
 * @module DatabaseQueries
 */
module.exports = { 
    createUserTableSQL, 
    deleteUserTableSQL, 
    createSessionTableSQL,
    addUserSQL,
    getUserSQL,
};
