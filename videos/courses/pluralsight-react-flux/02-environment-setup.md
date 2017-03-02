Environment Setup
------------------

Node
Browserify
Gulp
Bootstrap
ESLint



CommonJS
module.exports



npm install --save gulp gulp-open gulp-connect browserify reactify vinyl-source-stream gulp-concat bootstrap jquery gulp-eslint@0.15.0 react@0.13.3 react-router@0.13.3 flux@2.0.3

Summary:

We install node, npm and gulp (task runner) for our application. 

Gulp is a task runner, more like Make in C, that uses gulpfile.js to define the tasks that we are using in this project. Tasks can be minification, running a web server, moving files to another folder. 

We learned that we can define tasks, basically functions, to accomplish a single goal. We defined a task that copies our html files into a dist folder. We made a js task that uses browserify to bundle our javascript files. We made a css file that concatenates all our css files. We made a lint task that runs eslint in our js codebase.

Browserify is a module bundler that bundles and concatenates all related JS files in our project. Browserify has a root file, which in this example is the main.js file. From that root file, it determines all related js file and bundles all dependencies into one file which is the bundle.js (in this project).

