const express= require('express');
const mongoose = require('mongoose');
const Article = require('./models/article-model');
const app =express();
const articlesRouter= require('./routes/articles');
const { urlencoded } = require('express');
const methodOverride = require('method-override');
require ('dotenv').config();
const uri = process.env.ATLAS_URI;



mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true});
const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log("Conection DB Ok!");
});
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs');
app.use('/articles',articlesRouter);
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles : articles })
  })

app.listen(6161);
console.log('Server started!')