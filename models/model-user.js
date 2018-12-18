const mongoose = require ('mongoose');

var userSchema = new mongoose.Schema({
username:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
id:{
    type:String,   
}
    
});

const User =  module.exports =mongoose.model('User', userSchema);
