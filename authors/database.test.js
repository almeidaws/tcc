'use strict';

const { 
    Author, 
    connect, 
    disconnect,
    DDL: { cleanAuthorTable }
} = require('./database.js');
const { 
    Music, 
    connect: connectMusics, 
    disconnect: disconnectMusics,
    DDL: { 
        createMusicTable, 
        deleteMusicTable, 
    }
} = require('../musics/database.js');
const { runMigrations, rollbackMigrations } = require('../migrations/run.js');
const uuidv4 = require('uuid/v4');

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
    beforeEach(async () => {
        await cleanAuthorTable();
        // await createMusicTable();
    });
    
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

        const author = new Author("Gustavo");
        const queries = await connect();
        const addedAuthor = await queries.addAuthor(author);
        const queriedAuthor = await queries.getAuthorByID(addedAuthor.id);
        return expect(queriedAuthor).toEqual(addedAuthor);
    });        

    it('Checks if authors are retrieved from database', async () => {

        const author = new Author("Gustavo");
        const author2 = new Author("Renan");
        const author3 = new Author("Braga");
        const queries = await connect();
        await queries.addAuthor(author);
        await queries.addAuthor(author2);
        await queries.addAuthor(author3);
        const authors = await queries.getAllAuthors();
        const originals = [author, author2, author3];
        authors.forEach((author, index) => expect(author.name).toBe(originals[index].name));
    });        

    // it("Checks if an author isn't delete if there's music associated with it", async () => {

    //     // Create samples
    //     const author = new Author("Gustavo");
    //     const music = new Music('Do Seu Lado', [3, 4], [1], Buffer.from('FOO'), ".mp3")

    //     // Add data to the database
    //     const queries = await connect();
    //     queries.addAuthor(author);
    //     const musicQueries = await connectMusics();
    //     await musicQueries.addMusic(music);

    //     // This deletion must fail because there's a music associated
    //     // with that author
    //     const obstacles =  await queries.deleteAuthor(1);
    //     const obstacle = obstacles[0];
    //     expect(obstacle.name).toBe(music.name);
    //     expect(obstacle.fileS3Key).toBe(music.fileS3Key);

    //     // this delete of author must succeed because there's no
    //     // more music associated with that author.
    //     await musicQueries.deleteMusic(1);
    //     const emptyArray = await queries.deleteAuthor(1);
    //     expect(emptyArray.length).toBe(0);
    // });

    afterEach(async () => {
        // await deleteMusicTable();
    });

});

afterAll(async () => {
    await cleanAuthorTable();
    // await createMusicTable();
    await rollbackMigrations();
    await disconnect();
    await disconnectMusics();
});
