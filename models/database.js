const mongoose = require ('mongoose');

module.exports = mongoose.connect('mongodb://test:test12@ds227110.mlab.com:27110/todo-app',{ useNewUrlParser: true });
  
