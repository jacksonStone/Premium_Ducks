const fs = require('fs');
const { exec } = require('child_process');

console.log('Watching: \x1b[32mfrontend/\x1b[0m');
fs.watch('dist', { recursive: true, encoding: 'utf8' }, (eventType, filePath) => {
  if (filePath) {
  	let testFilePath = filePath.split('/');
  	let arg = filePath;
  	if(testFilePath.indexOf('tests')===-1) {
  		testFilePath.splice(testFilePath.length-1, 0, 'tests')
  		arg = testFilePath.join('/');
  	}
  	console.log('testing: ' + arg);
  	
		exec('npm run test_specific -s -- ' + arg, {stdio: "inherit"}, (err, stdout, stderr) => {
		  if(stdout) {
		  	const startingPoint = stdout.indexOf('HeadlessChrome');
		  	if(startingPoint !== -1 ) {
		  		let meaningfulMessage = stdout.substring(startingPoint);
		  		if(!(meaningfulMessage.includes('FAILED') && meaningfulMessage.includes('ERROR'))) {
		  			console.log("\x1b[32m You\'re good! ┬─┬ノ(º _ ºノ)\x1b[0m");
		  		} else {
		  			console.log(meaningfulMessage);
		  		}
		  	}
		  	
		  }
		  if(stderr || err) {
		  	console.log("\x1b[31m FAILURES!（╯° □ °）╯︵ ┻━┻\x1b[0m");
		  }
		});
  }
});

exec('babel frontend -d dist --watch --skip-initial-build', {stdio: "inherit"}, (err, stdout, stderr) => {
	console.error(err);
	console.log(stdout);
	console.log(stderr);
});