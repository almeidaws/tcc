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
        if (process.env.NODE_ENV === 'production')
            pool = {
                user: 'jxpnqxrwoebosm',
                host: 'ec2-54-225-121-235.compute-1.amazonaws.com',
                database: 'd5sllgppjr1jo6',
                password: '2dfcfff56aee97b0e065f3f2cd1874b9f1edca39d097d0d75283db09e53d2626',
                port: 5432,
            };
        else
            pool = {
                user: process.env.USER,
                host: 'localhost',
                database: process.env.USER,
                password: null,
                port: 5432,
            };
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
