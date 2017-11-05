const fileUtils = require('./fileUtils')
const recursiveOpToFile = fileUtils.recursiveOpToFile
const handleURL = fileUtils.handleURL
const directory = './frontend'
const fs = require('fs')

function copy (path, fileData) {
  const parts = path.split('/')
  parts[1] = 'dist'
  const dest = handleURL(parts.join('/'))
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, fileData, (err) => {
      if(err) reject(err)
      resolve('Copied: ' + dest);
    })
  })
}

recursiveOpToFile(directory, copy)
