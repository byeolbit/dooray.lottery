require('dotenv').config(); // load environment variables from dotenv
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      router = require('./routes/main'),
      port = process.env.PORT || 3000;

// Check token is defined
if (!process.env.DOORAY_TOKEN) {
    throw 'DOORAY_TOKEN is not defined'
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

const server = app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
