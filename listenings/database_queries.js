/**
 * @fileOverview contains queries used on the database.
 * @author Gustavo Amaral
 */

'use strict';

/** 
 * The SQL query used to add a listening entry with music ID when the music was listen.
 * @constant
 * @type {string}
 */
const addListeningSQL = 'INSERT INTO Listening (MusicID) VALUES ($1) RETURNING MusicID, WhenHappend;';

/** 
 * The SQL query used to get the last listened music from the database.
 * @constant
 * @type {string}
 */
const getLastListenedMusicsSQL = `
SELECT M.ID, M.Name, M.fileS3Key, M.posterUID, M.duration
FROM Listening L INNER JOIN Music M ON L.MusicID = M.ID ORDER BY L.WhenHappend DESC LIMIT 20;
`;

module.exports = { 
    addListeningSQL,
    getLastListenedMusicsSQL,
};
