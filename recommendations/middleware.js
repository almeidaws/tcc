'use strict';

const recommendations = require('../algorithm/algorithm.js');
const createError = require('http-errors');
const authorsDatabase = require('../authors/database.js');
const genresDatabase = require('../genres/database.js');
const favoritesDatabase = require('../favorites/database.js');

async function get(request, response, next) {
    try {

        if (!request.params.userID) { throw createError(400, "The user's ID is missing") }
        const userID = parseInt(request.params.userID);
        if (Number.isNaN(userID)) { throw createError(400, `The ID '${request.params.userID}' isn't a number`) }

        const authorQueries = await authorsDatabase.connect();
        const genresQueries = await genresDatabase.connect();
        const favoritesQueries = await favoritesDatabase.connect();
        
        const favorited = async (userID, musicID) => {
            if (!userID) return undefined;
            const favorite = new favoritesDatabase.Favorite(parseInt(userID), musicID);
            return await favoritesQueries.checkFavorite(favorite);
        };
        const musics = await recommendations(userID);
        if(!musics) return;
        const withFileURLs = musics.map(async music => ({ id: music.id, 
                                                    name: music.name, 
                                                    url: music.calculateFileURL(),
                                                    posterURL: music.posterUID ? music.calculatePosterURL() : null,
                                                    duration: music.duration,
                                                    authors: await authorQueries.getAuthorsByMusic(music.id),
                                                    genres: await genresQueries.getAllGenresFromMusic(music.id),
                                                    favorited: await favorited(userID, music.id),
                                                    }));
        const unfavoritedMusics = (await Promise.all(withFileURLs)).filter((music) => {
            return music.favorited === false
        });
        authorsDatabase.disconnect();
        genresDatabase.disconnect();
        favoritesDatabase.disconnect();
        response.status(200).json(unfavoritedMusics).end();
    } catch (error) {
        next(error);
    }
}
module.exports = { get }
