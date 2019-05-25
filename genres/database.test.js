'use strict';

const { 
    Genre, 
    connect, 
    disconnect,
} = require('./database.js');
const { runMigrations, rollbackMigrations } = require('../migrations/run.js');

beforeAll(async () => {
  await runMigrations();
});

describe('Testing Author table', async () => {
    it('Checks if genres are retrieved from database', async () => {

        const queries = await connect();
        const genres = await queries.getAllGenres();
        expect(genres.length).toBeGreaterThanOrEqual(5);
    });        

});

afterAll(async () => {
    await rollbackMigrations();
    await disconnect();
});
