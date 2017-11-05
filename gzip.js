const fileUtils = require('./fileUtils')
const recursiveOpToFile = fileUtils.recursiveOpToFile
const handleURL = fileUtils.handleURL
const directory = '/dist'
const fs = require('fs')
const zlib = require('zlib')

function gzip (path, fileData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(handleURL(path), zlib.gzipSync(fileData), (err, res) => {
      if (err) resolve()
      resolve()
    })
  })
}

recursiveOpToFile(directory, gzip)
