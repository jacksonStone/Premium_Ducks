const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function(req, res){
		const url = req.url !== '/' ? req.url : '/test.html';
		const trueURL = path.resolve(__dirname, '.'+url);
		console.log(trueURL);
		console.log(__dirname);
    fs.readFile(trueURL,function (err, data){
    	if(!data) {
    		return res.end();
    	}
        res.writeHead(200, {'Content-Length':data.length});
        res.write(data);
        res.end();
    });
}).listen(8001);