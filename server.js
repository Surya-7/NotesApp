const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')
mongoose.connect('mongodb://127.0.0.1:27017/blog')
const con = mongoose.connection;
con.on('open',()=>{
  console.log("Connected..")
})
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.get('/',async(req,res)=>{
    const articles = await Article.find().sort({
        createdAt:'desc'
    })
    res.render('articles/index.ejs',{articles:articles})
})
app.use('/articles',articleRouter)  
app.listen(5000,()=>{
    console.log("Server running at 5000")
})