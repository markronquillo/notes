## Introduction


## Validate your webpack config

`npm install --save-dev webpack-validator`

in your `package.json` file, include the following scripts

```json
{
    "scripts": {
        "validate": "npm-run-all --parallel validate-webpack:* lint test",
        "validate-webpack:dev": "webpack-validator webpack.config.js --env.dev",
        "validate-webpack:prod": "webpack-validator webpack.config.js --env.prod",
    }
}
```

## Tree shaking with webpack 2

Tree shaking is basically removing unused functions or codes in your build file.

`npm install --save-dev babel-preset-es2015`
in `.babelrc`, change `es2015` to `es2015-webpack`.


## Polyfill promises 





