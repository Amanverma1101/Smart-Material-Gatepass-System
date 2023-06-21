const express = require('express');
const app = express();

const bodyParser = require("body-parser");
const PORT = process.env.PORT || 80;

const pages = require('./routes/pages');
const auth = require('./routes/auth');
const usersignup = require('./routes/newuser');
const material = require('./routes/material');


app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");
app.use(cookieParser());     
const mw = require('./middleware');

app.use('/',mw);
app.use('/',pages);
app.use('/',auth);
app.use('/',usersignup);
app.use('/',material);

  
app.listen(PORT, () => {
    console.log(`port is running successfully at server ${PORT} !`);
  });