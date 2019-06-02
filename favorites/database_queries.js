/**
 * @fileOverview contains queries used on the database.
 * @author Gustavo Amaral
 */

'use strict';

/** 
 * The SQL query used to add a favorite entry with user and music ID.
 * @constant
 * @type {string}
 */
const addFavoriteSQL = 'INSERT INTO Favorite (UserID, MusicID) VALUES ($1, $2) RETURNING UserID, MusicID;';


/** 
 * The SQL query used to get all favorited musics from a user.
 * @constant
 * @type {string}
 */
const getAllFavoriteFromUserSQL = `
SELECT M.ID, M.Name, M.fileS3Key, M.posterUID, M.duration
FROM Favorite F INNER JOIN Music M ON F.Music = M.ID WHERE F.UserID = $1;
`;

/** 
 * The SQL query used to delete an author from the database.
 * @constant
 * @type {string}
 */
const deleteFavoriteQL = "DELETE FROM Favorite WHERE Music = $1 AND User = $2;";

module.exports = { 
    addFavoriteSQL,
    getAllFavoriteFromUserSQL,
    deleteFavoriteQL,
};
