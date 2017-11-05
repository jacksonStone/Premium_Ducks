This repo is meant to jump start a fullstack JS project in a TDD oriented way, and also showcase some sweet ducks.

Not all NodeJS projects need a billion dependecies. They just don't. The trade off of visibility for a short term gain in programmer efficiency is often a bad trade. Anyway, this project is evidence that you can build a whole site (toy though it might be) with very little dependecies. 

This project only uses Babel, and a ES6 Promise pollyfill during production. Meaning, everything else was "by-hand" allowing me to speed up deployments, and Grok what I was doing better. Rather than learning some third-party library I am able to in a focused way, address my exact use case, in minimal efficient code.

#Conventions

Test files should be located within a `tests` directory that is in the same directory as the file in question, and it should have the same name.

To watch for file changes, run `npm run watch_frontend`. Any change made to a .js file in this directory will trigger Karma running an instance of headless chrome, and it will exectue the corrisponding test file with the file just changed. In other words, if you were to change: `frontend/exampleFeature/example.js` the following test would be run: `frontend/exampleFeature/tests/example.js`. If you edit a test file, that file is the one that is rerun.

To run all tests: `npm run test`

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)