const fileUtils = require('./fileUtils');
const handleURL = fileUtils.handleURL
const directory = './frontend'
const fs = require('fs')
const distFolder = handleURL('./dist');
const { exec } = require('child_process')


if(fs.existsSync(handleURL('./dist'))) {
	exec('rm -rf dist && mkdir dist');
} else {
	exec('mkdir dist');
}