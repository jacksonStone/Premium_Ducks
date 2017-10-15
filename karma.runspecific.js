
let files = ['application/**/*.js'];
const path = process.argv[process.argv.length-1];
if(path) {
    files = ['application/**/tests/'+path+'.js', 'application/**/!(tests)/*.js'];
}

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: files,
    reporters: ['progress'],
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    concurrency: Infinity
  })
}