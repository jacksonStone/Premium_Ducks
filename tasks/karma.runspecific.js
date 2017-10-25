
let files = ['../frontend/**/*.js'];
const path = process.argv[process.argv.length-1];
if(path) {
    files = ['../frontend/'+path, '../frontend/*.js, ../frontend/**/!(tests|test_pages)/*.js'];
}

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    basePath: '../frontend',
    files: [
        'js/main.js',
        'js/utils/*.js',
        'js/navigation/*.js',
        'js/onload.js',
        path, 
    ],
    reporters: ['progress'],
    proxies: {
        '/': 'http://localhost:8001/'
    },
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    concurrency: Infinity
  })
}