const createUserTable = 
`CREATE TABLE IF NOT EXISTS Users (
    ID serial NOT NULL PRIMARY KEY, 
    Name text NOT NULL, 
    Email text NOT NULL, 
    Password text NOT NULL 
)`;

const { Pool } = require('pg');
const pool = new Pool();

pool.query(createUserTable)
    .then(success => { console.log('SUCCESS'); })
    .catch(error => { console.log('ERROR\n' + error); });

const test = () => {};
module.exports.test = test;
