'use strict';

const { 
    Session, 
    connect: connectSessions, 
    DDL: { 
        createSessionTable,
        deleteSessionTable, 
    }
} = require('./database.js');

const { 
    User, 
    connect: connectUsers, 
    DDL: { 
        createUserTable, 
        deleteUserTable, 
    }
} = require('../users/database.js');

const uuidv4 = require('uuid/v4');

const createExampleUser = id => new User(id, 'Gustavo', 'gustavo@gmail.com', '12345');
const createExampleSession = user => new Session(uuidv4(), user.id, new Date());

describe('Testing user\'s sessions', async () => {
    beforeEach(async () => {
        await createUserTable();
        await createSessionTable();
    });

    it('Tests if a session is created when a user is registered', async () => {
       expect.assertions(1);

       const user = createExampleUser();
       const usersQueries = await connectUsers();
       const sessionsQueries = await connectSessions();
       const addedUser = await usersQueries.addUser(user);
       const session = createExampleSession(addedUser);
       await sessionsQueries.addSession(session);
       const retrievedSession = await sessionsQueries.getSession(session.uuid);

       expect(retrievedSession).toEqual(session);
    });

    it('Tests if a session is deleted from the database', async () => {
       expect.assertions(1);

       const user = createExampleUser();
       const usersQueries = await connectUsers();
       const sessionsQueries = await connectSessions();
       const addedUser = await usersQueries.addUser(user);
       const session = createExampleSession(addedUser);
       await sessionsQueries.addSession(session);
       await sessionsQueries.deleteSession(session.uuid);
       const promise = sessionsQueries.getSession(session.uuid);

       return expect(promise).rejects.toThrow();
    });

    afterEach(async () => {
        await deleteSessionTable();
        await deleteUserTable();
    });

});
