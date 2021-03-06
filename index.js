const http = require('http')
const fs = require('fs')
const path = require('path')
const URL = require('url')
const args = process.argv.slice(2)

let isTesting = false
if (args.indexOf('testing') !== -1) {
  isTesting = true
}

let frontend = isTesting ? '/frontend' : '/dist'

http.createServer(function (req, res) {
  let url = req.url !== '/' ? req.url : '/pages/index.html'
  let urlParts = url.split('/')
  // Bad Url
  if (urlParts.length < 2) return res.end()
  let fileType = urlParts[1]

  if (!router[fileType]) fileType = 'misc'
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
    if (!isTesting && resourceDetails['Content-Encoding']) {
      headers['Content-Encoding'] = resourceDetails['Content-Encoding']
    }
    if (!isTesting) {
      headers['Cache-Control'] = 'max-age=604800'
    }
    res.writeHead(200, headers)
    res.write(data)
    res.end()
  })
}
// Put back content types
const router = {
  'js': (url) => {
    return {
      url: frontend + url,
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/javascript'
    }
  },
  'pages': (url) => {
    return {
      url: frontend + url,
      'Content-Encoding': 'gzip',
      'Content-Type': 'text/html'
    }
  },
  'css': (url) => {
    return {
      url: frontend + url,
      'Content-Encoding': 'gzip',
      'Content-Type': 'text/css'
    }
  },
  'images': (url) => {
    return {
      url: frontend + url,
      'Content-Encoding': 'gzip' }
  },
  'ducks': () => {
    return {
      url: '/ducks/duckMetadata.json' }
  },
  'misc': (url) => {
    return {
      url: frontend + url,
      'Content-Encoding': 'gzip' }
  }
}

function handleURL (url) {
  url = URL.parse(url).pathname
  return path.resolve(__dirname, '.' + url)
}
