const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mariadb');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const Goal = require('./models/dbconfig');

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

mariadb.connect(
  `mariadb://${process.env.MARIADB_USERNAME}:${process.env.MARIADB_PASSWORD}@mariadb:27017/course-goals?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error('FAILED TO CONNECT TO MARIADB');
      console.error(err);
    } else {
      console.log('CONNECTED TO MARIADB!!');
      app.listen(80);
    }
  }
);
