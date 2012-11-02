var static = require('node-static');

var fileServer = new static.Server('../');

require('http').createServer(function(request, response) {
	request.addListener('end', function() {
		console.log(request.url)
		if (request.url === "/") { // If the file wasn't found
			fileServer.serveFile('/client/html/index.html', 200, {}, request, response);
		}
		fileServer.serve(request, response);
	});
}).listen(8080);
console.log("Server listening at 127.0.0.1:8080. Crtl+C to stop this process.")