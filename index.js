const express=require('express');
const bodyParser=require('body-parser');
const route=require('./route/route')
const { mongo, default: mongoose } = require('mongoose');
const app=express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb+srv://Akshu22:Akshu11@cluster0.celuymd.mongodb.net/myTask', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/',route)

app.listen(3000,()=>{
    console.log("server is listening on port 3000")
})
