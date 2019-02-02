/**
 * @fileOverview contains configurations about all project.
 * 
 * @author Gustavo Amaral
 * @author Renan Alves
 */

'use strict';

const uuidv4 = require('uuid/v4');

/** 
 * Used to configurates session middleware when using ExpressJS 
 * @constant
 * @type {object}
 */
const session = {
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: null,
        expires: (() => { const now = new Date(); 
            now.setFullYear(now.getFullYear() + 1); 
            return now })(),
    },
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
};

/** 
 * The port where the server will run 
 * @constant
 * @type {number}
 */
const port = process.env.PORT || 5000;

module.exports = { session, port };
