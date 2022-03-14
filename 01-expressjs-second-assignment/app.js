const path = require('path');

const express = require('express');

const app = express();

const userRouters = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(userRouters);

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(3000);