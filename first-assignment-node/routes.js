const DUMMY_USERS = ['User 1', 'User 2', 'User 3', 'User 4', 'User 5'];

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<header><title>My First Assignment</title></header>');
    res.write('<body>');
    res.write('<h1>Welcome to my first assignment page!</h1>');
    res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form>')
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/users') {
    res.write('<html>');
    res.write('<header><title>My First Assignment Users</title></header>');
    res.write('<body><h1>Users</h1><ul>');
    DUMMY_USERS.forEach(user => {
      res.write(`<li>${user}</li>`);
    });
    res.write('</ul></body>')
    res.write('</html>');
    return res.end();
  }
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const newUsername = parsedBody.split('=')[1];
      DUMMY_USERS.push(newUsername);
      res.write('<html>');
      res.write('<header><title>A New User</title></header>');
      res.write(`<body><h1>New User</h1><p>New User: ${newUsername}</p></body>`);
      res.write('</html>');
      return res.end();
    });
  }
  res.setHeader("Content-Type", "text/html");
  // res.end();
}

module.exports = requestHandler;