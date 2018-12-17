const express = require('express');
const app = express();
const path = require('path');

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// Static files
app.use(express.static('./public'));

// Login route
app.get('/', function(req, res){
    res.render("login");
});
// After logged route
app.get('/logged', function(req, res){
    res.render("logged");
})
// Login route

app.listen(3000);
console.log("Listening on port 3000");