'use strict';

const { 
    Author, 
    connect, 
    disconnect,
    DDL: { cleanUpAuthorTable }
} = require('./database.js');
const { 
    Music, 
    connect: connectMusics, 
    disconnect: disconnectMusics,
    DDL: { 
        createMusicTable, 
        deleteMusicTable, 
        cleanUpMusicTable,
    }
} = require('../musics/database.js');
const { runMigrations, rollbackMigrations } = require('../migrations/run.js');
const uuidv4 = require('uuid/v4');

const createAuthor = () => new Author(uuidv4());
const createBuffer = () => Buffer.from(uuidv4()); 
const createMusic = (authors) => {
    return new Music(uuidv4(), [1, 2], authors.map(author => author.id), createBuffer(), '.mp3');
}


beforeAll(async () => {
  await runMigrations();
});

describe('Testing Author type', () => {
    it("Checks if pseudo overriding of Author's constructor is working", () => {
       const id = 1;
       const name = 'Gustavo';

       const author = new Author(name);
       expect(author.id).toBe(null);
       expect(author.name).toBe(name);

       const author2 = new Author(id, name);
       expect(author2.id).toBe(id);
       expect(author2.name).toBe(name);
    });
});

describe('Testing Author table', async () => {
    describe('Checks invalid authors', async () => {
        it('Checks if authors with invalid name aren\'t added to the database', async () => {

            const withEmptyName = new Author("");
            const withBlankName = new Author("    ");
            const withNullName = new Author(null);
            const withUndefinedName = new Author(undefined);

            expect.assertions(4);
            const queries = await connect();
            await expect(queries.addAuthor(withEmptyName)).rejects.toThrow();
            await expect(queries.addAuthor(withBlankName)).rejects.toThrow();
            await expect(queries.addAuthor(withNullName)).rejects.toThrow();
            await expect(queries.addAuthor(withUndefinedName)).rejects.toThrow();
        });
    });
    
    it('Checks if authors are added to the database', async () => {
        expect.assertions(1);

        const author = createAuthor();
        const queries = await connect();
        const addedAuthor = await queries.addAuthor(author);
        const queriedAuthor = await queries.getAuthorByID(addedAuthor.id);
        return expect(queriedAuthor).toEqual(addedAuthor);
    });        

    it('Checks if authors are retrieved from database', async () => {

        const author = createAuthor();
        const author2 = createAuthor();
        const author3 = createAuthor();
        const queries = await connect();
        await queries.addAuthor(author);
        await queries.addAuthor(author2);
        await queries.addAuthor(author3);
        const authors = await queries.getAllAuthors();
        const originals = [author, author2, author3];
        const names = authors.map(author => author.name);
        expect(names.includes(author.name)).toBe(true);
        expect(names.includes(author2.name)).toBe(true);
        expect(names.includes(author3.name)).toBe(true);
    });        

    it("Checks if an author isn't delete if there's music associated with it", async () => {

        // Create samples
        const author = createAuthor();
        const queries = await connect();
        const addedAuthor = await queries.addAuthor(author);
        const music = createMusic([addedAuthor]);
        const musicQueries = await connectMusics();
        const addedMusic = await musicQueries.addMusic(music);

        // This deletion must fail because there's a music associated
        // with that author
        const obstacles =  await queries.deleteAuthor(addedAuthor.id);
        // The obstacle to deletion is the music...
        const obstacle = obstacles[0];
        expect(obstacle.name).toBe(addedMusic.name);
        expect(obstacle.fileS3Key).toBe(addedMusic.fileS3Key);

        // This delete of author must succeed because there's no
        // more music associated with that author.
        await musicQueries.deleteMusic(addedMusic.id);
        // This is the array of musics related with this author, which must be zero
        const emptyArray = await queries.deleteAuthor(addedAuthor.id);
        expect(emptyArray.length).toBe(0);
    });

    afterEach(async () => {
        // await deleteMusicTable();
    });

});

afterAll(async () => {
    await cleanUpAuthorTable();
    await cleanUpMusicTable();
    await rollbackMigrations();
    await disconnect();
    await disconnectMusics();
});
