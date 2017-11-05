
const path = process.argv[process.argv.length - 1]

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    basePath: '../frontend',
    files: [
      'js/main.js',
      'js/utils/*.js',
      'js/navigation/*.js',
      'js/onload.js',
      path
    ],
    reporters: ['progress'],
    proxies: {
      '/': 'http://localhost:5000/'
    },
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    concurrency: Infinity
  })
}
