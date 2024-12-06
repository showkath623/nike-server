const mongoose=require('mongoose');
const userData=new mongoose.Schema({
    name:{type:String,required:true},
    uid:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
})

module.exports=mongoose.model('User',userData)