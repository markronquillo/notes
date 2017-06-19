## Zero Configuration Compilation

`webpack src/main.js dist/bundle.js --watch`

```javascript
// in npm scripts, to be able to pass arguments to a defined script you need to prepend --
build: webpack ...,
test: npm run build -- --grep="pattern"
```

## A Dedicated Configuration File

Create a `webpack.config.js`


## Modules are Simply Files

## Loaders are Transformers

This `webpack.config.js` uses `css-loader` and `style-loader`. Note that the array of loaders are executed/evaluated from right to left.

```javascript
module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
    ]
}
```

## ES2015 Compilation with Babel

use babel for the loader

Install the loader `babel-loader babel-core`

```javascript
module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }
    ]
}
```

Then, install the preset, the ecmascript version to be interpret, `babel-preset-es2015`. Lastly, create a file `.babelrc` and explicitly write the preset that you will use.


## Minifications and Environments

The idea with plugins is that we can run a series of transformers or generators in our build process. In the example below, we include `webpack.optimize.UglifyJSPlugin()` to minimize our output files.

```javascript
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
```

We should only do this in production builds/deploys. To work on this issue.


```javascript
    if(process.env.NODE_ENV = 'production)
    {
        module.exports.plugins.push(
            new webpack.optimize.UglifyJSPlugin()
        )
    }
```

## Sass Compilation

The config below will  transform sass to css, interpret css files and inject those styles in the page.

```javascript
{
    test: /\.s[ac]css$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
}
```

## Extract CSS to a Dedicated File

```javascript
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// test
use: ExtractTextPlugin.extract({
    use: [css-loader', 'sass-loader'],
    fallback: 'style-loader'
})

// plugins
new ExtractTextPlugin('[name].css')

```

You can have multiple entry file that will result into one output file. In this case, instead of `importing` the `main.scss` inside `main.js`, we explicitly say that include it in the entry file.

```javascript
entry: {
    app: [
        './main.js',
        './main.scss'
    ]
}
```

Minifiying our output css file

```javascript
new webpack.LoaderOptionPlugin({
    minimize: true
})
```

## Relative URL Conundrum

The problem is, what if we are using `url()` in our css to refer to relative image files. By default, webpack uses the path where the css was stored.

```javascript
{
    ...
    use: ExtractTextPlugin.extract({
        use: ['css-loader', 'sass-loader'],
        fallback: 'style-loader'
    })
}
```

### Solutions

1. set the `url()` path to absolute instead of relative

2. we can set `css-loader` to ignore `url()` css codes.

```javascript
    use: ExtractTextPlugin.extract({
        use: [
            {
                loader: 'css-loader',
                options: { url: false }
            },
            
            'sass-loader'
        ]
    });
```

3. use `raw-loader` instead of `css-loader`. if we don't want our css to be interpreted further anyway.

```javascript
{
    ...
    use: ExtractTextPlugin.extract({
        use: ['raw-loader', 'sass-loader'],
        fallback: 'style-loader'
    })
}
```

4. Interpret files using `file-loader` or `url-loader`.

```javascript
    // make sure you use `css-loader` instead of `raw-loader`
    {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: "images/[name].[ext]"
        }
    }
```















 