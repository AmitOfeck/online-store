const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const articles = require('./routes/article');

//require('custom-env').env(process.env.NODE_ENV, './config');

mongoose.connect("mongodb://localhost:27017/news", 
    {   useNewUrlParser: true, 
        useUnifiedTopology: true });

/*
mongoose.connect(process.env.CONNECTION_STRING, 
                {   useNewUrlParser: true, 
                    useUnifiedTopology: true });
                    */

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

app.use('/articles', articles);

app.listen(8080);
//app.listen(process.env.PORT);