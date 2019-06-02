'user strict';

const createMigrationTableSQL = `
CREATE TABLE IF NOT EXISTS Migration (
    Version integer NOT NULL,
    Description text NOT NULL
);`;

const deleteMigrationTableSQL = "DROP TABLE Migration";

const allMigrationsSQL = "SELECT Version, Description FROM Migration;";

const migration1 = `
CREATE TABLE Genre (
    ID serial NOT NULL PRIMARY KEY,
    Name text NOT NULL
);

CREATE TABLE Author (
    ID serial NOT NULL PRIMARY KEY,
    Name text NOT NULL
);

CREATE TABLE Music (
    ID serial NOT NULL PRIMARY KEY,
    Name text NOT NULL,
    fileS3Key text NOT NULL,
    UNIQUE (fileS3Key)
);

CREATE TABLE MusicGenre (
    Music integer NOT NULL,
    Genre integer NOT NULL,
    FOREIGN KEY (Music) REFERENCES Music(ID),
    FOREIGN KEY (Genre) REFERENCES Genre(ID)
);

CREATE TABLE MusicAuthor (
    Music integer NOT NULL,
    Author integer NOT NULL,
    FOREIGN KEY (Music) REFERENCES Music(ID),
    FOREIGN KEY (Author) REFERENCES Author(ID)
);

CREATE TABLE Users (
    ID serial NOT NULL PRIMARY KEY, 
    Name text NOT NULL, 
    Email text NOT NULL UNIQUE, 
    Password text NOT NULL 
);

CREATE TABLE Session (
    UUID text NOT NULL,
    UserID integer NOT NULL references Users(ID),
    Expiration timestamp(6) NOT NULL
);

INSERT INTO Migration (Version, Description) VALUES (1, 'Initial migration');
`;

const migration1Rollback = `
DROP TABLE Session;
DROP TABLE Users;
DROP TABLE MusicAuthor;
DROP TABLE MusicGenre;
DROP TABLE Music;
DROP TABLE Author;
DROP TABLE Genre;

DELETE FROM Migration WHERE Version = 1;
`;

const migration2 = `
INSERT INTO Genre (ID, Name) VALUES (0, 'Classical');
INSERT INTO Genre (ID, Name) VALUES (1, 'Pop');
INSERT INTO Genre (ID, Name) VALUES (2, 'Romantic');
INSERT INTO Genre (ID, Name) VALUES (3, 'Hip Hop');
INSERT INTO Genre (ID, Name) VALUES (4, 'Dancing');
INSERT INTO Genre (ID, Name) VALUES (5, 'Rock');
INSERT INTO Genre (ID, Name) VALUES (6, 'Jazz'); 
INSERT INTO Genre (ID, Name) VALUES (7, 'Blues'); 

INSERT INTO Migration (Version, Description) VALUES (2, 'Add genres');
`;

const migration2Rollback = `
DELETE FROM Genre WHERE ID = 0;
DELETE FROM Genre WHERE ID = 1;
DELETE FROM Genre WHERE ID = 2;
DELETE FROM Genre WHERE ID = 3;
DELETE FROM Genre WHERE ID = 4;
DELETE FROM Genre WHERE ID = 5;
DELETE FROM Genre WHERE ID = 6; 
DELETE FROM Genre WHERE ID = 7; 

DELETE FROM Migration WHERE Version = 2;
`;

const migration3 = `
ALTER TABLE Music
ADD posterUID text;

INSERT INTO Migration (Version, Description) VALUES (3, 'Add posterUID at Music table');
`;

const migration3Rollback = `
ALTER TABLE Music
DROP COLUMN posterUID;

DELETE FROM Migration WHERE Version = 3;
`;

const migration4 = `
ALTER TABLE Music ADD duration real;
INSERT INTO Migration (Version, Description) VALUES (4, 'Add duration column to Music');
`;

const migration4Rollback = `
ALTER TABLE Music
DROP COLUMN duration;

DELETE FROM Migration WHERE Version = 4;
`;

const migration5 = `
CREATE TABLE Favorite (
    UserID integer NOT NULL,
    MusicID integer NOT NULL,
    PRIMARY KEY UserID,
    PRIMARY KEY MusicID,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (MusicID) REFERENCES Music(ID)
);

INSERT INTO Migration (Version, Description) VALUES (5, 'Add Favorite table');
`;

const migration5Rollback = `
DROP TABLE Favorite;

DELETE FROM Migration WHERE Version = 5;
`;

module.exports = { 
    createMigrationTableSQL,
    deleteMigrationTableSQL,
    allMigrationsSQL,
    migrations: [migration1, migration2, migration3, migration4, migration5],
    rollback: [migration5Rollback, migration4Rollback, migration3Rollback, migration2Rollback, migration1Rollback]
};
