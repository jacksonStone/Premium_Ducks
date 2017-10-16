const http = require('http');
const fs = require('fs');
const path = require('path');
const URL = require('url'); // built-in utility

http.createServer(function(req, res){
		let url = req.url !== '/' ? req.url : '/test_pages/test.html';
		if(url.indexOf('/node_modules') !== 0) {
			if(url.indexOf('.html')!== -1) {
				url= '/frontend' + url;
			} else {
				url= '/dist' + url;
			}
		}
		url = URL.parse(url).pathname;
		const trueURL = path.resolve(__dirname, '.'+url);
		console.log(trueURL);
    fs.readFile(trueURL,function (err, data){
    	if(!data) {
    		return res.end();
    	}
        res.writeHead(200, {'Content-Length':data.length});
        res.write(data);
        res.end();
    });
}).listen(8001);