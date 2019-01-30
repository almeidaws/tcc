const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.get('/register', (request, response) => {
    response.send('registered');
});

// const database = require('./database.js');
// database.connect();

//add the router
app.use('/', router);
app.use(express.static(__dirname + '/public'));
app.listen(process.env.port || 5000);
