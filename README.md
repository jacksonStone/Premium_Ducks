This repo is meant to jump start a fullstack JS project in a TDD oriented way.

Test files should be located within a `tests` directory that is in the same directory as the file in question, and it should have the same name.

To watch for file changes, run `npm run watch_frontend`. Any change made to a .js file in this directory will trigger Karma running an instance of headless chrome, and it will exectue the corrisponding test file with the file just changed. In other words, if you were to change: `frontend/exampleFeature/example.js` the following test would be run: `frontend/exampleFeature/tests/example.js`. If you edit a test file, that file is the one that is rerun.

By default, all files that are not in a `tests` directory are included as dependencies for the tests.