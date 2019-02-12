/**
 * @fileOverview contains configurations about all the project. It's useful because you can
 * change project's behavior on a central point without accessig a differente file for
 * each thing.
 * 
 * @author Gustavo Amaral
 * @author Renan Alves
 */

'use strict';

const uuidv4 = require('uuid/v4');
const { Pool } = require('pg');

/** This namespace is used to wrapps configuratinos relatated to user's session, like
 * its instantiation and middlewares from ExpressJS.
 */
const Session = {

};

/** 
 * This namespace contains configurations related to the database like username, passwords, hosts,
 * and etc. 
 */
const Database = {
    /**
     * Object used to perform queries in a more efficient way. This is the
     * Pool from 'pg' module.
     */
    pool: () => {
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV === 'production')
            return new Pool({ connectionString: process.env.DATABASE_URL });
        else if (process.env.NODE_ENV === 'test')
            return new Pool({ connectionString: `postgres://${process.env.USER}:@localhost:5432/miraculoustest` });
        else if (process.env.NODE_ENV === 'development')
            return new Pool({ connectionString: `postgres://${process.env.USER}:@localhost:5432/miraculous` });
        else 
            throw new Error('Unknown environment. Access the line of this error to see more.');
    },
};

/**
 * This namespace contains configurations related to the server creation and running. Currently
 * this namespace contains just the port number.
 */
const Server = {
    /** 
     * The port where the server will run 
     * @constant
     * @type {number}
     */
    port: process.env.PORT || 5000,
};

module.exports = { Session, Database, Server };
