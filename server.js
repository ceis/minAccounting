var http = require('http')
var connect = require('connect');
var serveStatic = require('serve-static');

var app = connect();
app.use(serveStatic(__dirname));
http.createServer(app).listen(process.env.PORT || 9988, process.env.IP || "localhost");
