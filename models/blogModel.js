const mongoose=require('mongoose');

const ObjectId=mongoose.Schema.ObjectId;

const blogSchema=new mongoose.Schema({
    title:{type:'String', required:true},
    body:{type:'String', required:true},
    authorId:{type:ObjectId,ref:"user",required:true},
    publishedAt:{type:'Date',default:null},
    // isPublished:{type:'Boolean',default:true}
},{timestamps:true})

module.exports=mongoose.model('blogs',blogSchema)