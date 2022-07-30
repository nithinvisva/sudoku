const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/sudoku-solving-angular'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/sudoku-solving-angular/index.html'));});
app.listen(process.env.PORT || 8080);