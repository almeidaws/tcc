/**
 * @fileOverview contains queries used on the database.
 * @author Gustavo Amaral
 */

'user strict';

// MUSICS

const createMusicTableSQL =
`CREATE TABLE IF NOT EXISTS Music (
    ID serial NOT NULL PRIMARY KEY,
    Name text NOT NULL,
    fileS3Key text NOT NULL,
    UNIQUE (fileS3Key)
)`;

const createMusicGenreTableSQL =
`CREATE TABLE IF NOT EXISTS MusicGenre (
    Music integer NOT NULL,
    Genre integer NOT NULL,
    FOREIGN KEY (Music) REFERENCES Music(ID),
    FOREIGN KEY (Genre) REFERENCES Genre(ID)
)`;

const createMusicAuthorTableSQL =
`CREATE TABLE IF NOT EXISTS MusicAuthor (
    Music integer NOT NULL,
    Author integer NOT NULL,
    FOREIGN KEY (Music) REFERENCES Music(ID),
    FOREIGN KEY (Author) REFERENCES Author(ID)
)`;

const getAllMusicsSQL = 
`SELECT ID, Name, fileS3Key FROM Music;`;

const findMusicByNormalizedFileKeySQL = 
`SELECT (ID, Name, fileS3Key) FROM Music WHERE fileS3Key = $1;`;

const getMusicByIDSQL = "SELECT ID, Name, fileS3Key FROM Music WHERE ID = $1;"

const addMusicSQL = 'INSERT INTO Music (Name, fileS3Key) VALUES ($1, $2) RETURNING ID';
const addMusicAuthorSQL = 'INSERT INTO MusicAuthor (Music, Author) VALUES ($1, $2)';
const addMusicGenreSQL = 'INSERT INTO MusicGenre (Music, Genre) VALUES ($1, $2)';

/**
 * Exports several object that contains several SQL queries used on the project.
 * @module DatabaseQueries
 */
module.exports = { 
    getMusicByIDSQL,
    createMusicTableSQL,
    createMusicGenreTableSQL,
    createMusicAuthorTableSQL,
    findMusicByNormalizedFileKeySQL,
    getAllMusicsSQL,
    addMusicSQL,
    addMusicAuthorSQL,
    addMusicGenreSQL,
};
