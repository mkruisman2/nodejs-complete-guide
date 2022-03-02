const express = require('express');

const app = express();

app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/add-product', (req, res, next) => {
    console.log("In product middleware!");
    console.log(req.url);
    res.send('<h1>The Add Product Page</h1>');
});

app.use('/', (req, res, next) => {
    console.log("In another middleware!");
    console.log(req.url);
    res.send('<h1>Hello from Express</h1>');
});

app.listen(3000);
