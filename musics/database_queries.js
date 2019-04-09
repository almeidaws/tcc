/**
 * @fileOverview contains queries used on the database.
 * @author Gustavo Amaral
 */

'user strict';

// GENRES

/**
 * The SQL query to create the genre's table. The table is created
 * only if it not exists.
 * @constant
 * @type {string}
 */
const createGenreTableSQL =
`CREATE TABLE IF NOT EXISTS Genre (
    ID serial NOT NULL PRIMARY KEY,
    Name text NOT NULL
)`;

/** The SQL query used to delete the table Genre. It was originally created
 * to reset the database when performing unity tests.
 * @constant
 * @type {string}
 */
const deleteGenreTableSQL = 'DROP TABLE Genre';

/**
 * Insert default genres to the Genre table, that acts as an enumeration.
 * @constant
 * @type {string}
 */
const pupulateGenreTableSQL = 
`
INSERT INTO Genre (ID, Name) VALUES (0, 'Classical');
INSERT INTO Genre (ID, Name) VALUES (1, 'Pop');
INSERT INTO Genre (ID, Name) VALUES (2, 'Romantic');
INSERT INTO Genre (ID, Name) VALUES (3, 'Hip Hop');
INSERT INTO Genre (ID, Name) VALUES (4, 'Dancing');
INSERT INTO Genre (ID, Name) VALUES (5, 'Rock');
INSERT INTO Genre (ID, Name) VALUES (6, 'Jazz'); 
INSERT INTO Genre (ID, Name) VALUES (7, 'Blues'); 
INSERT INTO Author (ID, Name) VALUES (2, 'Zé Ramalho'); 
`;

// AUTHORS

const createAuthorTableSQL =
`CREATE TABLE IF NOT EXISTS Author (
    ID serial NOT NULL PRIMARY KEY,
    Name text NOT NULL
)`;

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

const findMusicByNormalizedFileKeySQL = 
`SELECT (ID, Name, fileS3Key) FROM Music WHERE fileS3Key = $1;`;

const addMusicSQL = 'INSERT INTO Music (Name, fileS3Key) VALUES ($1, $2) RETURNING ID';
const addMusicAuthorSQL = 'INSERT INTO MusicAuthor (Music, Author) VALUES ($1, $2)';
const addMusicGenreSQL = 'INSERT INTO MusicGenre (Music, Genre) VALUES ($1, $2)';

/**
 * Exports several object that contains several SQL queries used on the project.
 * @module DatabaseQueries
 */
module.exports = { 
    createGenreTableSQL, 
    pupulateGenreTableSQL,
    createAuthorTableSQL,
    createMusicTableSQL,
    createMusicGenreTableSQL,
    createMusicAuthorTableSQL,
    findMusicByNormalizedFileKeySQL,
    addMusicSQL,
    addMusicAuthorSQL,
    addMusicGenreSQL,
};
