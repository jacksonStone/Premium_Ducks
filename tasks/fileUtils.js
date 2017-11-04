const fs = require('fs')
const URL = require('url')
const path = require('path')

function handleURL (url) {
  url = URL.parse(url).pathname
  return path.resolve(__dirname, url)
}

function mkdir (path) {
  return new Promise((resolve, reject) => {
    const parts = path.split('/')
    parts[1] = 'dist'
    const dest = handleURL(parts.join('/'))
    fs.mkdir(dest, () => {
      resolve()
    })
  })
}

function recursiveOpToFile (currentPath, callback) {
  return new Promise((resolve, reject) => {
    fs.readdir(handleURL(currentPath), (_, files) => {
      Promise.all(files.map(fileName => {
        return new Promise((resolve, reject) => {
          let newPath = currentPath + '/' + fileName
          fs.readFile(handleURL(newPath), (err, fileData) => {
            if (fileData) {
              return callback(newPath, fileData)
                .then(() => {
                  resolve()
                })
            }
            if (err && err.code === 'EISDIR') {
              return mkdir(newPath)
                .then(() => {
                  return recursiveOpToFile(newPath, callback)
                }).then(() => {
                  resolve()
                })
            }
          })
        })
      })).then(() => { resolve('Done') })
    })
  })
}

exports.recursiveOpToFile = recursiveOpToFile
exports.handleURL = handleURL
