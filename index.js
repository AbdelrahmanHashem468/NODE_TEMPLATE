const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');

const mongourl = process.env.mongoUrl;
console.log(mongourl);
mongoose.connect(mongourl)
  .then(()=>console.log('Database Connected'))
  .catch((error)=>console.error('Database Connection failed', error));

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;
  return res
    .status(error.statusCode)
    .json({ error: error.toString() });
});

const Port = process.env.PORT;

app.listen(Port, () => { console.log(`UP : 127.0.0.1:${Port}`); });
