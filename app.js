const express = require('express');
const app = express();

const bodyParser = require("body-parser");
const PORT = process.env.PORT || 80;

const pages = require('./routes/pages');
const usersignup = require('./routes/newuser');


app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',pages);
app.use('/',usersignup);

  
app.listen(PORT, () => {
    console.log(`port is running successfully at server ${PORT} !`);
  });