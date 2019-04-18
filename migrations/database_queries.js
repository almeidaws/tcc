'user strict';

const createMigrationTableSQL = `
CREATE TABLE IF NOT EXISTS Migration (
    Version integer NOT NULL,
    Description text NOT NULL
);`;

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

module.exports = { createMigrationTableSQL, allMigrationsSQL, migrations: [migration1, migration2] };
