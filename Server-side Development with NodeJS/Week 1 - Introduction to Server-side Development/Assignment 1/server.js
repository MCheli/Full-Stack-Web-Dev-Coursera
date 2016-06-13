var morgan = require('morgan');
var express = require('express');
var dishRouter = require('./dishRouter')
var promoRouter = require('./promoRouter')
var leaderRouter = require('./leaderRouter')

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter)
app.use('/leadership',leaderRouter)

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
    //noinspection JSAnnotator
    console.log(`Server running at http://${hostname}:${port}/`);
});
