const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

// app.use(express.json());
// app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.use(express.json({limit: '50mb'}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(cors());

app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

// app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../static/index.html')));

app.get('/', (req, res) => res.render(path.join(__dirname, '../static/index.html')));

app.use('/api/auth', require('./api/auth'));
app.use('/api/fetchdata', require('./api/fetchdata'));
app.use('/api/products', require('./api/products'));
app.use('/api/users', require('./api/users'));

module.exports = app;