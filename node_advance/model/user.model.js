var mongoose = require('mongoose')
var user = new mongoose.Schema({
    id:{type:Number, required:true },
    username:{ type:String, required:true},
    password:{type:String, required:true},
    userfirstname:{type:String, required:true},
    userlastname:{type:String, required:true},
    userprename:{type:String, required:true},
    createat:{type:Date,default:Date.now},
    updateat:{type:Date,default:Date.now}
  });
 module.exports = mongoose.model('user', user);