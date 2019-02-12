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
    Email text NOT NULL UNIQUE, 
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
/**
 * The SQL query used to add a user to the table Users. It's not the final query because it has
 * three parameters: user's name, email and password. This parameters should be used with 
 * 'pg' node module.
 * @constant
 * @type {string}
 */
const addUserSQL = 'INSERT INTO Users (Name, Email, Password) VALUES ($1, $2, $3) RETURNING ID';

/**
 * The SQL used to retreive a user from database by its ID. This SQL isn't intend to be
 * used as is. It contains a unique variable that is the user ID, a positive integer. 
 * It was created to be used with 'pg' module.
 * @constant
 * @type {string}
 */
const getUserSQL = 'SELECT ID, Name, Email, Password FROM Users WHERE ID = $1';

/**
 * The SQL used to retrieve all users from database with a given email. The email is supposed to
 * be unique to perform login.
 *
 * It contains a variable of type string that is the user's email. This SQL was created to 
 * be used with 'pg' module. Emails retrieved from database are lowercased, so when using
 * it you should lowercase the email supplied by the variable too.
 * @constant
 * @type {string}
 */
const authUserSQL = 'SELECT ID, Name, Email, Password FROM Users WHERE lower(Email) = $1';

/**
 * Exports several object that contains several SQL queries used on the project.
 * @module DatabaseQueries
 */
module.exports = { 
    createUserTableSQL, 
    deleteUserTableSQL, 
    createSessionTableSQL,
    deleteSessionTableSQL,
    addSessionSQL,
    getSessionSQL,
    deleteSessionSQL,
    addUserSQL,
    getUserSQL,
    authUserSQL,
};
