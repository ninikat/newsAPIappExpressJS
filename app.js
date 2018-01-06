const express= require('express');
const bodyParser = require('body-parser')
//this is the path where the file is
const NewsItem = require('./newsItem')
const app = express()

//setting the body parser to use json
app.use(bodyParser.json())

let newsItems=[]

app.delete('/news',function(req,res){
  let secretIdToDelete = req.body.newsId
  console.log(secretIdToDelete)
   for(x in newsItems){
     console.log(newsItems[x].newsId)
     if(secretIdToDelete===newsItems[x].newsId){
       newsItems.splice(x,1)
     }
   }
})


app.post('/news', function(req,res){
  let newsTitle = req.body.title;
  let newsDescription = req.body.description;
  let newsDate = req.body.publishedDate;

  let userNewItem = new NewsItem(newsTitle,newsDescription,newsDate);
  userNewItem.newsId = newsItems.length + 1

  newsItems.push(userNewItem);
  //console.log(userNewItem) console.log(newsTitle) console.log(newsDescription) console.log(newsDate) console.log(newsItems)
  res.json({success:true})
})

app.get('/', function(req,res){
  //return as json
  res.json(newsItems)
})

app.listen(3000,()=> console.log('Example app listening on port 3000'))
