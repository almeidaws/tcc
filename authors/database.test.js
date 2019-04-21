'use strict';

const { 
    Author, 
    connect, 
    disconnect,
    DDL: { 
        createAuthorTable, 
        deleteAuthorTable, 
    }
} = require('./database.js');
const uuidv4 = require('uuid/v4');

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
        await createAuthorTable();
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
        author.id = 1;
        author2.id = 2;
        author3.id = 3;
        expect(authors).toEqual([author, author2, author3]);
    });        

    afterEach(async () => {
        await deleteAuthorTable();
    });

});

afterAll(async () => {
    await disconnect();
});
