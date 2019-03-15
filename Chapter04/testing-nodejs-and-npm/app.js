const _ = require('lodash');
const http = require('http');

http.createServer(function(req,res) {
        
    res.writeHead(200, 
        { 
            'Content-Type': 'text/plain; charset=utf-8' 
        }
    );

    let random_value = _.random(15, 20);

    res.end(`hey, my server is up and running! and I got a random number ${random_value}`);

}).listen(3000);

console.log('The server has been started at localhost:3000. press Ctrl+C to stop the server');