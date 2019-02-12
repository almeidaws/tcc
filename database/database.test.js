const { User, connect, DDL: { createUserTable, deleteUserTable, deleteSessionTable } } = require('./database.js');

const createExampleUser = () => new User('Gustavo', 'gustavo@gmail.com', '12345');

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

    it('Checks if users are added to the database', async () => {
        expect.assertions(1);

        const user = createExampleUser();
        const queries = await connect();
        const addedUser = await queries.addUser(user);
        const queriedUser = await queries.getUser(addedUser.id);
        return expect(queriedUser).toEqual(addedUser);
    });        

    afterEach(async () => {
        await deleteSessionTable();
        await deleteUserTable();
    });

});
