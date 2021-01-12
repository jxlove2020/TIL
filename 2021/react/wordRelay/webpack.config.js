const path = require('path'); // 폴더의 경로를 알려줌

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
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties'],
            },
        }],
    },

    output: {
        path: path.join(__dirname, 'dist'), // __dirname 현재폴더
        filename: 'app.js'
    }, // 출력
};