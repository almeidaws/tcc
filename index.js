const express = require('express');
const app = express();
const path = require('path');
const database = require('./database/database.js');
const bodyparser = require('body-parser');
const session = require('express-session');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 5000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(session({
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: null,
        expires: (() => { const now = new Date(); 
            now.setFullYear(now.getFullYear() + 1); 
            return now })(),
    },
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
}));


app.post('/user/register', (request, response, next) => {
    (async () => {
        try {
            const queries = await database.connect();
            const body = request.body;
            const encryptedPassword = await bcrypt.hash(body.password, 10);
            const user = await new database.User(body.name, body.email, encryptedPassword);
            const result = await queries.addUser(user);
            const userID = result.rows[0];

            request.session.userID = userID;
            response.status(200);
            response.end();
        } catch (error) {
            next(error);
        }
    })();
});    
    

app.use(express.static(path.join(__dirname, 'public')))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
