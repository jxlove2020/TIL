const path = require('path');

module.exports = {
    mode: 'development', //production
    devtool: 'eval',     // hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx'],
    },

    entry: {
        app: './client',
    },
    module: {
        rules: [{
            test: /\.jsx?$/, 
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [],
            },
        }],
    },
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'),
    },
}