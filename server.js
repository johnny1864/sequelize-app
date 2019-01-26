const express = require('express');
const exhb = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');

// TEST DB CONNECTION
db.authenticate()
  .then(_ => console.log('Database connected...'))
  .catch(err => console.log(err));

const app = express();

// HANDLEBARS
app.engine('handlebars', exhb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// STATIC FOLDER
app.use(express.static(path.join(__dirname, '/public')));

// INDEX ROUTE
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// GIG ROUTES
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server running on port ', PORT));
