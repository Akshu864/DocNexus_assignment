const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({

    fname:{type:String,trim:true,required:true},
    lname:{type:String,trim:true},
    title:{type:String,trim:true,enum:['Mr','Mrs','Miss']},
    email:{type:String,trim:true,unique:true,required:true},
    phone:{type:String,trim:true,required:true},
    password:{type:String,trim:true,required:true},
},{timestamps:true})

module.exports=mongoose.model('User',userSchema)