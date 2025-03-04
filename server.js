const http = require("http");
const hostname = "localhost";
const fs = require('fs');
const port = 8080;



const server = http.createServer(function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");  // Allow all domains
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allow these HTTP methods
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");

      // Handle Preflight OPTIONS Request
if (req.method === "OPTIONS") {
    res.writeHead(204); // No Content response
    res.end();
    return;
}
    filePath = './data.json';
    if (req.url == '/data') {
        fs.readFile(filePath, function(error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    res.writeHead(404);
                    res.end(error.code);
                }
                else {
                    res.writeHead(500);
                    res.end(error.code);
                }
            }
            else {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(content);
            }
        });
    }
    else {
        res.writeHead(404);
        res.end('404 NOT FOUND');
    }
});

server.listen(port, hostname, () => {
    console.log('Server started on port ', port);
});
