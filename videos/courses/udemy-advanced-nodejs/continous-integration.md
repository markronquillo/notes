### What is CI?

Process to merge all code changes into a single branch

### What is a CI Server?

Server that runs automatic checks (tests) on the codebase to ensure the changes haven't broken anything.

### CI FLow

. Developer pushes code to github
. CI Server detects that a new push of code has occurred
. CI Server clones project to a cloud based virtual machine
. CI Server runs all tests
. If all tests pass, CI Server marks build as 'passing' and does some optional followup

### CI Providers

- Travis CI
- Circle CI
- Codeship
- AWS Codebuild

### Travis CI FLow

. We push code to Github
. Travis automatically detects pushed code
. Travis clones our project
. Travis runs tests using '.travis.yml' file
. If tests are OK, Travis sends us an email.

`https://codebeautify.org/yaml-to-json-xml-csv`

`docs.travis-ci.com`

```yaml
language: node_js
node_js: 
	- "8"
dist: trusty
services:
	- mongodb
	- redis-server
env:
	- NODE_ENV=ci PORT=3000
cache:
	directories:
	- node_modules
	- client/node_modules
install:
	- npm install
	- npm run build
script:
	- nohup npm run start &
	- sleep 3
	- npm run test
```

`nohup` - if the shell is closed, don't kill anything this commands creates
& - run this command ina subshell in the background

sleep 3 - gives a little time to bootup the server


### More Server Configuration

- Add ci.js key file (like dev.js or prod.js config file)
- Fix redis URL in services/cache.js
- Add redis URL to dev.js and ci.js
- Add mongoDB URI to ci.js
- Make sure server starts on port 3000 in CI mode
- Make sure server serves react client files in CI mode


### TravisCI Setup

Just add your repository in the admin tool of Travis CI


### Triggering CI Builds

Just push to your repository

Q: Where did we define the branch in github? If we want travis CI to only build on master, is that possible?



