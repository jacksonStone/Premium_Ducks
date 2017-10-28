const http = require('http')
const fs = require('fs')
const path = require('path')
const URL = require('url')

http.createServer(function (req, res) {
  let url = req.url !== '/' ? req.url : '/pages/index.html'
  if (url.indexOf('/ducks') === 0) {
    return fetchDuckData(res)
  }
  if (url.indexOf('/node_modules') !== 0) {
    if (url.indexOf('.js') === -1) {
      url = '/frontend' + url
    } else {
      url = '/dist' + url
    }
  }
  url = URL.parse(url).pathname
  const trueURL = path.resolve(__dirname, '.' + url)
  fs.readFile(trueURL, (err, data) => {
    if (!data || err) {
      return res.end()
    }
    res.writeHead(200, {'Content-Length': data.length})
    res.write(data)
    res.end()
  })
}).listen(8001)

function fetchDuckData (res) {
  const url = URL.parse('/ducks/duckMetadata.json').pathname
  const trueURL = path.resolve(__dirname, '.' + url)
  fs.readFile(trueURL, (err, data) => {
    if (err) {
      return res.end()
    }
    res.writeHead(200, {'Content-Length': data.length})
    res.write(data)
    res.end()
  })
}
