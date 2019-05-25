/**
 * @fileOverview contains queries used on the database.
 * @author Gustavo Amaral
 */

'user strict';

/**
 * The SQL query to create the session's table. The table is created
 * only if it not exists.
 * @constant
 * @type {string}
 */
const createSessionTableSQL = 
`CREATE TABLE IF NOT EXISTS Session (
    UUID text NOT NULL,
    UserID integer NOT NULL references Users(ID),
    Expiration timestamp(6) NOT NULL
)`;

/** The SQL query used to delete the table session. It was originally created
 * to reset the database when performing unity tests.
 * @constant
 * @type {string}
 */
const deleteSessionTableSQL = 'DROP TABLE Session';

/**
 * Adds a new session within the database. This query was created to be used with 'pg' module
 * because it contains three variables in this order: session's uuidv4 token, user's id and
 * expiration date.
 * @constant
 * @type {string}
 */
const addSessionSQL = 'INSERT INTO Session (UUID, UserID, Expiration) VALUES ($1, $2, $3)';

/**
 * Removes a session from the database using its UUID/Token.
 * This query was created to be used with 'pg' module. So, it 
 * requires one variable that is the session's UUID/Token.
 * @constant
 * @type {string}
 */
const deleteSessionSQL = 'DELETE FROM Session WHERE UUID = $1';

/**
 * Retrieves a session from the database based on its UUID token.
 * It was created to be used with 'pg' module so it have a unique variable that corresponds
 * to the session's token.
 * @contant
 * @type {string}
 */
const getSessionSQL = 'SELECT UUID, UserID, Expiration FROM Session WHERE UUID = $1';

module.exports = { 
    createSessionTableSQL,
    deleteSessionTableSQL,
    addSessionSQL,
    getSessionSQL,
    deleteSessionSQL,
};
