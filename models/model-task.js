const mongoose = require ('mongoose');

var todoSchema = new mongoose.Schema({
    item:String,
    id:String
});

var Todo =module.exports =  mongoose.model('Todo',todoSchema);



