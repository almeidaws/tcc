'use strict';

const recommendations = require('../algorithm/algorithm.js');
const createError = require('http-errors');

async function get(request, response, next) {
    try {
        if (!request.params.userID) { throw createError(400, "The user's ID is missing") }
        const userID = parseInt(request.params.userID);
        if (Number.isNaN(userID)) { throw createError(400, `The ID '${request.params.userID}' isn't a number`) }
        response.status(200).json(await recommendations(userID)).end();
    } catch (error) {
        next(error);
    }
}
module.exports = { get }
