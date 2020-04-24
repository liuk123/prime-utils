const path = require('path');

module.exports = {
    mode: "production",
    // devtool:'source-map',

    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, "./dist/js"),
        filename: '[name].js',
        library: '$$',
        libraryTarget: 'umd'
    },
    
}