const http = require('http')
const fs = require('fs')
const path = require('path')
const URL = require('url')

http.createServer(function (req, res) {
  let url = req.url !== '/' ? req.url : '/pages/index.html'
  let urlParts = url.split('/')
  // Bad Url
  if (urlParts.length < 2) return res.end()
  const fileType = urlParts[1]
  // Bad url
  if (!router[fileType]) return res.end()
  // Nice Try!
  if (urlParts.indexOf('..') !== -1) return res.end()

  const resourceDetails = router[fileType](url)
  return fetchResource(resourceDetails, res)
}).listen(process.env.PORT || 5000)

function fetchResource (resourceDetails, res) {
  const trueURL = handleURL(resourceDetails.url)
  fs.readFile(trueURL, (err, data) => {
    if (!data || err) {
      return res.end()
    }
    const headers = {'Content-Length': data.length}
    if (resourceDetails['Content-Type']) {
      headers['Content-Type'] = resourceDetails['Content-Type']
    }
    if (resourceDetails['Content-Encoding']) {
      headers['Content-Encoding'] = resourceDetails['Content-Encoding']
    }
    headers['Cache-Control'] = 'max-age=86400'
    res.writeHead(200, headers)
    res.write(data)
    res.end()
  })
}
// Put back content types
const router = {
  'js': (url) => {
    return {
      url: '/dist' + url,
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/javascript'
    }
  },
  'pages': (url) => {
    return {
      url: '/dist' + url,
      'Content-Encoding': 'gzip',
      'Content-Type': 'text/html'
    }
  },
  'css': (url) => {
    return {
      url: '/dist' + url,
      'Content-Encoding': 'gzip',
      'Content-Type': 'text/css'
    }
  },
  'images': (url) => {
    return {
      url: '/dist' + url,
      'Content-Encoding': 'gzip' }
  },
  'ducks': () => {
    return {
      url: '/ducks/duckMetadata.json' }
  },
  'favicon.ico': () => {
    return {
      url: '/dist/favicon.ico',
      'Content-Encoding': 'gzip' }
  }
}

function handleURL (url) {
  url = URL.parse(url).pathname
  return path.resolve(__dirname, '.' + url)
}
