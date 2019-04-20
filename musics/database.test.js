'use strict';

const { 
    Music, 
    connect, 
    disconnect,
    DDL: { 
        createMusicTable, 
        deleteMusicTable, 
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

const createExampleMusic = () => new Music('Do Seu Lado', [3, 4], [1, 2], Buffer.from('FOO'), ".mp3");
const populateAuthorTable = async () => {
    const author1 = new Author("Sandy e Junior");
    const author2 = new Author("Zezé Di Camargo e Luciano");

    const queries = await connectAuthor();
    await queries.addAuthor(author1);
    await queries.addAuthor(author2);
};

beforeAll(async () => {
  await runMigrations();
});

describe('Testing Music table', async () => {
    beforeEach(async () => {
        await createAuthorTable();
        await populateAuthorTable();
        await createMusicTable();
    });
    
    describe('Checks invalid musics', async () => {
        it('Checks if musics with invalid name aren\'t added to the database', async () => {
            const genres = [1, 3];
            const authors = [1, 2];
            const fileBuffer = Buffer.from('My Awsome Buffer');
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
            const authors = [1, 2];
            const fileBuffer = Buffer.from('My Awsome Buffer');
            const extension = ".mp3";

            const emptyGenres = new Music("Do Seu Lado", [], authors, fileBuffer, extension);

            expect.assertions(1);
            const queries = await connect();
            await expect(queries.addMusic(emptyGenres)).rejects.toThrow();
        });

        it('Checks if musics with invalid authors aren\'t added to the database', async () => {
            const genres = [1, 3];
            const fileBuffer = Buffer.from('My Awsome Buffer');
            const extension = ".mp3";

            const emptyAuthors = new Music("Do Seu Lado", genres, [], fileBuffer, extension);

            expect.assertions(1);
            const queries = await connect();
            await expect(queries.addMusic(emptyAuthors)).rejects.toThrow();
        });
    });
    
    it('Checks if all musics are returned from database', async () => {
        const numberOfExamples = 10;

        const musics = [];
        for (let i = 0; i < numberOfExamples; i++) {
            const music = createExampleMusic();
            music.name += i;
            music.calculateFileS3Key();
            musics.push(music);
        }

        const queries = await connect();
        for (let i = 0; i < numberOfExamples; i++)
            await queries.addMusic(musics[i]);
            
        const retrievedMusics = await queries.getAllMusics();

        retrievedMusics.forEach((music, i) => {
            expect(music.name).toBe(musics[i].name);
            expect(music.fileS3Key).toBe(musics[i].fileS3Key);
        });
    });        

    it(`Checks if a music is deleted from the database.`, async () => {
        const music = createExampleMusic();
        const queries = await connect();
        const addedMusic = await queries.addMusic(music);

        const deleted = await queries.deleteMusic(addedMusic.id);
        expect(deleted).toBe(true);

        const notDeleted = !(await queries.deleteMusic(addedMusic.id));
        expect(notDeleted).toBe(true);
    });

    it(`Checks equal musics aren't added to the database`, async () => {
        expect.assertions(1);

        const music = createExampleMusic();
        const music2 = createExampleMusic();
        const queries = await connect();
        await queries.addMusic(music);
        await expect(queries.addMusic(music2)).rejects.toThrow();
    });

    it(`Checks if a music are added to the database`, async () => {
        expect.assertions(1);

        const music = createExampleMusic();
        const music2 = createExampleMusic();

        const queries = await connect();
        await queries.addMusic(music);
        await expect(queries.addMusic(music2)).rejects.toThrow();
    });

    afterEach(async () => {
        await deleteMusicTable();
        await deleteAuthorTable();
    });
});

afterAll(async () => {
    await createAuthorTable();
    await createMusicTable();
    await rollbackMigrations();
    await disconnectAuthor();
    await disconnect();
});

