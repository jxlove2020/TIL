const path = require('path'); // 폴더의 경로를 알려줌
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
module.exports = {
    name: 'word-relay-setting',
    mode: 'development', // 실서비스 production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'],
    }, // 확장자를 확인해줌, 아래 entry에서 파일 확장자를 확인
    entry: {
        app: ['./client'], // client.jsx , WordRelay.jsx // client에서 WordRelay 를 불러오기 때문에 하나만 적어줘도 됩
    }, // 입력
    module: {
        rules: [{
            test: /\.jsx?$/, // js 파일과 jsx 파일에 룰을 적용
            loader: 'babel-loader', // jsx , 엣날 문법 
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
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            },
        }],
    },
    plugins: [
        new RefreshWebpackPlugin
    ],
    output: {
        //실제경로
        path: path.join(__dirname, 'dist'), // __dirname 현재폴더, 
        filename: 'app.js',

        // publicPath: 가상의 경로라고 생각
        publicPath: '/dist/',  // webpack-dev-server 에서 필요
    }, // 출력
    devServer: {
        publicPath: '/dist/',  // 가상의 경로
        hot: true,
    }
};