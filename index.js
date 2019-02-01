const express = require('express');
const app = express();
const path = require('path');
const database = require('./database.js');
const bodyparser = require('body-parser');

const PORT = process.env.PORT || 5000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.post('/user/register', (request, response, next) => {
    (async () => {
        try {
            const queries = await database.connect();
            const body = request.body;
            const user = new database.User(body.name, body.email, body.password);
            await queries.addUser(user);
            response.status(200).send('User registered with success.\nIn the future this will return a session token.\n');
        } catch (error) {
            next(error);
        }
    })();
});    
    

app.use(express.static(path.join(__dirname, 'public')))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
