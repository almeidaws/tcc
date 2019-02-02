const express = require('express');
const app = express();
const path = require('path');
const database = require('./database.js');
const bodyparser = require('body-parser');
const session = require('express-session');
const uuidv4 = require('uuid/v4');

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
            const user = new database.User(body.name, body.email, body.password);
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
