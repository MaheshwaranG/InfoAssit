var http = require('http');

http.createServer(function(req, res){
	res.writeHeader(502, {'çontent-Type':"text/plain"});
	res.end("Hi intgeration Team");
	console.log("Url is http://localhost:8002");
}).listen(8002);