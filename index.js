const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const genreses = require('./routes/genreses')
const home = require('./routes/home');
const express = require('express');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');  //default

app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genreses', genreses);
app.use('/', home);

//Fake date 
app.listen(3000, () => console.log('Listening on port 3000...'));