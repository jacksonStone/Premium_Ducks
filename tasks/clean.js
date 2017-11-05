const fileUtils = require('./fileUtils')
const handleURL = fileUtils.handleURL
const fs = require('fs')
const { exec } = require('child_process')

if (fs.existsSync(handleURL('./dist'))) {
  exec('rm -rf dist && mkdir dist')
} else {
  exec('mkdir dist')
}
