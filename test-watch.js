const fs = require('fs');

fs.watch('application', { recursive: true, encoding: 'utf8' }, (eventType, filePath) => {
  if (filePath) {
  	let testFilePath = filePath.split('/');
  	if(testFilePath.indexOf('tests')!==-1) {
  		return console.log(filePath);
  	}
  	testFilePath.splice(testFilePath.length-1, 0, 'tests')
  	console.log(testFilePath.join('/'));

  }
});