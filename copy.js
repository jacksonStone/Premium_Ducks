const fileUtils = require('./fileUtils')
const recursiveOpToFile = fileUtils.recursiveOpToFile
const handleURL = fileUtils.handleURL
const directory = '/frontend'
const fs = require('fs')

function copy (path, fileData) {
  return new Promise((resolve, reject) => {
    const parts = path.split('/')
    console.log(parts);
    parts[1] = 'dist'
    const dest = handleURL(parts.join('/'))
    const trueURL = handleURL(path)
    return copyFile(trueURL, dest).then(resolve)
  })
}

function copyFile (source, target) {
  return new Promise(function (resolve, reject) {
    fs.copyFile(source, target, (err) => {
      if (err) reject(err)
      console.log('copied: ' + source)
      resolve('Copied: ' + source)
    })
  })
}

recursiveOpToFile(directory, copy)
