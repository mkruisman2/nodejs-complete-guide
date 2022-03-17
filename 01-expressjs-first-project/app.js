const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const { engine } = require('express-handlebars');

const app = express();
app.set('view engine', 'ejs');
// app.engine('hbs', engine({layoutsDir: 'views/layouts', defaultLayout: 'main-layout', extname: 'hbs'}));
// app.set('view engine', 'hbs'); // Set the engine to express-handlebars which is used to render any dynamic templates
// app.set('view engine', 'pug'); // Set the engine to pug which is used to render any dynamic templates
app.set('views', 'views'); 
// Set the directory where to find the views folder/files. Default is 'views' so no need to add this line if you don't have your files in a different folder.

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: "" });
});

app.listen(3000);
