const mysql = require('mysql');

const config =
{
    host: 'musicrecommendation.database.windows.net',
    user: 'tcc2018ucb@musicrecommendation',
    password: '@TccBccUCB',
    database: 'miraculous',
    port: 3306,
    ssl: true
};

const connection = new mysql.createConnection(config);

const connect = () => {
    connection.connect((error) => {
        if (error) {
            console.log('An error has occured');
            console.log(error);
        } else
            console.log('Success');
    });
};

module.exports.connect = connect;


