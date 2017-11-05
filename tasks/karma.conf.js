module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    basePath: '../frontend/js',
    files: [
      'main.js',
      'utils/*.js',
      'navigation/*.js',
      'pages/*.js',
      '**/tests/*.js'
    ],
    reporters: ['progress'],
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    proxies: {
      '/': 'http://localhost:5000/'
    },
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity
  })
}
