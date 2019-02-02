'user strict';

const { Pool } = require('pg');
const Joi = require('joi');
const pool = new Pool();
const { createUserTableSQL, addUserSQL } = require('./database_queries.js');

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    validate() {
        const scheme = {
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        };
        return Joi.validate(this, scheme);
    }
}

const addUser = (user) => {
    const { error, validatedUser } = user.validate();
    if (error) Promise.reject(error);
    
    const addUserConfig = {
        text: addUserSQL,
        values: [user.name, user.email, user.password],
    };

    return pool.query(addUserConfig);
};
    
const connect = () => {
    const promise = pool.query(createUserTableSQL).then(response => ({ addUser: addUser }) )
    return promise
};

module.exports = { User: User, connect: connect };
