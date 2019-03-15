const http = require('http');

http.createServer(function(req,res) {
        
    res.writeHead(200, 
        { 
            'Content-Type': 'text/plain; charset=utf-8' 
        }
    );

    res.end('hey, my server is up and running!');

}).listen(3000);

console.log('The server has been started at localhost:3000. press Ctrl+C to stop the server');