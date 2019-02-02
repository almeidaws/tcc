'user strict';

const createUserTable = 
`CREATE TABLE IF NOT EXISTS Users (
    ID serial NOT NULL PRIMARY KEY, 
    Name text NOT NULL, 
    Email text NOT NULL, 
    Password text NOT NULL 
)`;

const addUser = 'INSERT INTO Users (Name, Email, Password) VALUES ($1, $2, $3) RETURNING ID';
const allUsers = 'SELECT ID, Name, Email, Password FROM Users';

const queries = {
    createUserTableSQL: createUserTable,
    addUserSQL: addUser,
};

module.exports = queries;
