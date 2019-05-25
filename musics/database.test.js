'use strict';

const { 
    Music, 
    connect, 
    disconnect,
    DDL: { 
        createMusicTable, 
        deleteMusicTable, 
        cleanUpMusicTable,
    }
} = require('./database.js');
const {
    Author,
    connect: connectAuthor,
    disconnect: disconnectAuthor,
    DDL: {
        createAuthorTable,
        deleteAuthorTable,
    }
} = require('../authors/database.js');
const { runMigrations, rollbackMigrations } = require('../migrations/run.js');
const uuidv4 = require('uuid/v4');

const createAuthor = async () => {
    const author1 = new Author(uuidv4());
    const queriesAuthor = await connectAuthor();
    const addedAuthor = await queriesAuthor.addAuthor(author1);
    return addedAuthor;
}

const createBuffer = () => Buffer.from(uuidv4()); 

const createMusic = async () => {
    const author1 = await createAuthor();
    const author2 = await createAuthor();
    return new Music(uuidv4(), [1, 2], [author1.id, author2.id], createBuffer(), '.mp3');
}

beforeAll(async () => {
  await runMigrations();
});

describe('Testing Music table', async () => {
    
    describe('Checks invalid musics', async () => {
        it('Checks if musics with invalid name aren\'t added to the database', async () => {
            const genres = [1, 3];
            const author1 = await createAuthor();
            const author2 = await createAuthor();
            const authors = [author1.id, author2.id];
            const fileBuffer = createBuffer();
            const extension = ".mp3";

            const emptyName = new Music("", genres, authors, fileBuffer, extension);
            const spacedName = new Music("        ", genres, authors, fileBuffer, extension);
            const nullName = new Music(null, genres, authors, fileBuffer, extension);
            const undefinedName = new Music(undefined, genres, authors, fileBuffer, extension);

            expect.assertions(4);
            const queries = await connect();
            await expect(queries.addMusic(emptyName)).rejects.toThrow();
            await expect(queries.addMusic(spacedName)).rejects.toThrow();
            await expect(queries.addMusic(nullName)).rejects.toThrow();
            await expect(queries.addMusic(undefinedName)).rejects.toThrow();
        });

        it('Checks if musics with invalid genres aren\'t added to the database', async () => {

            const author1 = await createAuthor();
            const author2 = await createAuthor();
            const authors = [author1.id, author2.id];
            const fileBuffer = createBuffer();
            const extension = ".mp3";

            const emptyGenres = new Music("Do Seu Lado", [], authors, fileBuffer, extension);

            expect.assertions(1);
            const queries = await connect();
            await expect(queries.addMusic(emptyGenres)).rejects.toThrow();
        });

        it('Checks if musics with invalid authors aren\'t added to the database', async () => {
            const genres = [1, 3];
            const fileBuffer = createBuffer();
            const extension = ".mp3";

            const emptyAuthors = new Music("Do Seu Lado", genres, [], fileBuffer, extension);

            expect.assertions(1);
            const queries = await connect();
            await expect(queries.addMusic(emptyAuthors)).rejects.toThrow();
        });
    });
    
    it('Checks if all musics are returned from database', async () => {
        expect.assertions(1);

        const musics = [];
        const numberOfExamples = 10;
        for (let i = 0; i < numberOfExamples; i++) {
            const music = await createMusic();
            music.name += i;
            music.calculateFileS3Key();
            musics.push(music);
        }

        const queries = await connect();
        for (let i = 0; i < numberOfExamples; i++)
            await queries.addMusic(musics[i]);
            
        const retrievedMusics = await queries.getAllMusics();
        // The number can't be exactly equal to 'numberOfExamples' because the database could have
        // other musics added to it.
        expect(retrievedMusics.length).toBeGreaterThanOrEqual(numberOfExamples);
    });        

    it(`Checks if a music is deleted from the database.`, async () => {
        expect.assertions(2);

        // Create example music
        const music = await createMusic();
        const queries = await connect();
        const addedMusic = await queries.addMusic(music);

        const deleted = await queries.deleteMusic(addedMusic.id);
        expect(deleted).toBe(true);

        const notDeleted = !(await queries.deleteMusic(addedMusic.id));
        expect(notDeleted).toBe(true);
    });

    it(`Checks equal musics aren't added to the database`, async () => {
        expect.assertions(1);
        const music = await createMusic();

        const queries = await connect();
        await queries.addMusic(music);
        await expect(queries.addMusic(music)).rejects.toThrow();
    });

    it(`Checks if a music are added to the database`, async () => {
        expect.assertions(1);

        const music = await createMusic();
        const queries = await connect();
        const queried = await queries.addMusic(music);
        expect(queried.name).toBe(music.name);
    });

    it(`Checks it's possible to get all musics by author ID`, async () => {
        expect.assertions(4);

        const author = await createAuthor();
        const fileBuffer = createBuffer();
        const extension = ".mp3";
        const music1 = new Music(uuidv4(), [1, 2], [author.id], fileBuffer, extension);
        const music2 = new Music(uuidv4(), [1, 2], [author.id], fileBuffer, extension);
        const queries = await connect();
        await queries.addMusic(music1);
        await queries.addMusic(music2);

        const originalMusics = [music1, music2];
        const queriedMusics = await queries.getMusicsByAuthor(author.id);

        for (let i = 0; i < 2; i++) {
            var queried = queriedMusics[i];
            const original = originalMusics[i];
            expect(queried.name).toBe(original.name);
            expect(queried.fileS3Key).toBe(original.fileS3Key);
        }
    });

});

afterAll(async () => {
    try {
        await cleanUpMusicTable();
        await rollbackMigrations();
    } catch (error) {
        console.log(error);
        throw error;
    }

    await disconnectAuthor();
    await disconnect();
});

