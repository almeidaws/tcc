'use strict';

const { 
    User, 
    Session, 
    connect, 
    DDL: { 
        createUserTable, 
        deleteUserTable, 
        createSessionTable,
        deleteSessionTable, 
    }
} = require('./database.js');
const uuidv4 = require('uuid/v4');

const createExampleUser = id => new User(id, 'Gustavo', 'gustavo@gmail.com', '12345');
const createExampleSession = user => new Session(uuidv4(), user.id, new Date());

describe('Testing User type', () => {
    it("Checks if pseudo overriding of User's constructor is working", () => {
       const name = 'Paulo';
       const email = 'paulo@gmail.com';
       const password = '1234';

       const user = new User(name, email, password);
       expect(user.id).toBe(null);
       expect(user.name).toBe(name);
       expect(user.email).toBe(email);
       expect(user.password).toBe(password);

       const id = 5;
       const user2 = new User(id, name, email, password);
       expect(user2.id).toBe(id);
       expect(user2.name).toBe(name);
       expect(user2.email).toBe(email);
       expect(user2.password).toBe(password);

       const user3 = new User(null, name, email, password);
       expect(user).toEqual(user3);

       const user4 = new User(undefined, name, email, password);
       expect(user).toEqual(user4);
    });
});

describe('Testing Users table', async () => {
    beforeEach(async () => {
        await createUserTable();
    });
    
    describe('Checks invalid users', async () => {
        it('Checks if users with invalid password aren\'t added to the database', async () => {
            const name = 'Paulo';
            const email = 'paulo@gmail.com';

            const withEmptyPassword = new User(name, email, '');
            const withNullPassword = new User(name, email, null);
            const withUndefinedPassword = new User(name, email, undefined);

            expect.assertions(3);
            const queries = await connect();
            await expect(queries.addUser(withEmptyPassword)).rejects.toThrow();
            await expect(queries.addUser(withNullPassword)).rejects.toThrow();
            await expect(queries.addUser(withUndefinedPassword)).rejects.toThrow();
        });

        it('Checks if users with invalid email aren\'t added to the database', async () => {
            const name = 'Paulo';
            const password = '12345';

            const withEmptyEmail= new User(name, '', password);
            const withNullEmail = new User(name, null, password);
            const withUndefinedEmail = new User(name, undefined, password);
            const withInvalidEmail = new User(name, 'paulo@.com', password);

            expect.assertions(4);
            const queries = await connect();
            await expect(queries.addUser(withEmptyEmail)).rejects.toThrow();
            await expect(queries.addUser(withNullEmail)).rejects.toThrow();
            await expect(queries.addUser(withUndefinedEmail)).rejects.toThrow();
            await expect(queries.addUser(withInvalidEmail)).rejects.toThrow();
        });

        it('Checks if users with invalid name aren\'t added to the database', async () => {
            const email = 'paulo@gmail.com';
            const password = '1234';

            const withEmptyName = new User('', email, password);
            const withNullName = new User(null, email, password);
            const withUndefinedName = new User(undefined, email, password);

            expect.assertions(3);
            const queries = await connect();
            await expect(queries.addUser(withEmptyName)).rejects.toThrow();
            await expect(queries.addUser(withNullName)).rejects.toThrow();
            await expect(queries.addUser(withUndefinedName)).rejects.toThrow();
        });
    });
    
    it('Checks if users are added to the database', async () => {
        expect.assertions(1);

        const user = createExampleUser();
        const queries = await connect();
        const addedUser = await queries.addUser(user);
        const queriedUser = await queries.getUser(addedUser.id);
        return expect(queriedUser).toEqual(addedUser);
    });        

    it('Checks if a user can be authenticated', async () => {
        expect.assertions(1);

        const user = createExampleUser();
        const queries = await connect();
        const addedUser = await queries.addUser(user);
        const authUser = await queries.authUser(user.email, user.password);
        return expect(addedUser).toEqual(authUser);
    });

    it('Checks if a user with wrong password isn\'t authenticated', async () => {
        expect.assertions(1);

        const user = createExampleUser();

        const queries = await connect();
        const addedUser = await queries.addUser(user);
        const authUser = await queries.authUser(user.email, user.password);
        const pass = user.password;
        await expect(queries.authUser(user.email, pass + pass)).rejects.toThrow();
    });

    it('Checks users with the same email', async () => {
        expect.assertions(1);

        const email = 'foo@gmail.com'
        const user1 = new User('Paulo', email, '123');
        const user2 = new User('Juliana', email, '546');

        const queries = await connect();
        await queries.addUser(user1);
        return expect(queries.addUser(user2)).rejects.toThrow();
    });

    afterEach(async () => {
        await deleteSessionTable();
        await deleteUserTable();
    });

});

describe('Testing user\'s sessions', async () => {
    beforeEach(async () => {
        await createUserTable();
        await createSessionTable();
    });

    it('Tests if a session is created when a user is registered', async () => {
       expect.assertions(1);

       const user = createExampleUser();
       const queries = await connect();
       const addedUser = await queries.addUser(user);
       const session = createExampleSession(addedUser);
       await queries.addSession(session);
       const retrievedSession = await queries.getSession(session.uuid);

       expect(retrievedSession).toEqual(session);
    });

    afterEach(async () => {
        await deleteSessionTable();
        await deleteUserTable();
    });
});
