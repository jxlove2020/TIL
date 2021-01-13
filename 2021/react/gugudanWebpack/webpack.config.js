const path = require('path');
const webpack = require('webpack');

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
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            // https://github.com/browserslist/browserslist
                            browsers: ['> 5% in KR', 'last 2 chrome versions'], 
                        },
                        debug: true,
                    }], 
                    '@babel/preset-react',
                ],
                plugins: [],
            },
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }), // debug: true 세팅 해주는 플러그인
    ],
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'),
    },
}