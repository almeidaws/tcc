/**
 * @fileOverview contains configurations about all project.
 * 
 * @author Gustavo Amaral
 * @author Renan Alves
 */

'use strict';

const uuidv4 = require('uuid/v4');
const session = require('express-session');

const Session = {

    /** 
     * Used to configurates session middleware when using ExpressJS. Every 
     * time you call this function, a new configuration object is generated.
     *
     * It's used internally by 'createMiddleware' to create a new middleware that
     * can be used on ExpressJS.
     *
     * @returns {object}
     */
    createSessionConfig: () => ({
            cookie: {
                path: '/',
                httpOnly: true,
                secure: false,
                maxAge: null,
                expires: (() => { const now = new Date(); 
                    now.setFullYear(now.getFullYear() + 1); 
                    return now })(),
            },
            store: new (require('connect-pg-simple')(session))(),
            secret: uuidv4(),
            resave: false,
            saveUninitialized: true,
    }),

    /**
     * Function used as middleware to create session's logic on application. Every time
     * you call this function, a new middleware is created and configurated.
     *
     * You can use the return of this function directly as a middleware on ExpressJS.
     *
     * @constant
     * @type {Function}
     */
    createMiddleware: () => session(Session.createSessionConfig()),
};


/** 
 * The port where the server will run 
 * @constant
 * @type {number}
 */
const port = process.env.PORT || 5000;

/**
 * Contains configuration object used to access the database.
 */
let pool;
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
        user: 'gustavo',
        host: 'localhost',
        database: 'gustavo',
        password: null,
        port: 5432,
    };

module.exports = { Session, port, pool };
