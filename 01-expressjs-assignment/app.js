const express = require('express');

const app = express();

app.get('/favicon.ico', (req, res) => res.status(204));

// app.use((req, res, next) => {
//   console.log("In the first middleware");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("In the second middleware");
//   res.send("<h2>This is the second middleware</h2>");
// });

app.use('/users', (req, res, next) => {
  res.send('<h1>This is the users page</h1>');
  console.log("Users page");
});

app.use('/', (req, res, next) => {
  res.send('<h1>This is the default page</h1>');
  console.log("Default page");
});

app.listen(3000);