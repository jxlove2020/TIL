const  path = require('path')

module.exports = {
    // "production" | "development" | "none"
    mode: "production", 
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // webpack-dev-server 가 바로 반영(js파일들)되게 하려면 추가
        publicPath: 'dist'
    },
    module: {
        rules : [{   
            test:/\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: {
                loader : 'babel-loader',
                options: {
                    presets: [
                            ['@babel/preset-env', {
                            'targets': {
                                'browsers': ["last 2 version", "ie 9"]
                            },
                            // 어떤 브라우저가 있는지 확인
                            'debug': true
                        }]
                    ]
                }
            }         
        }]
    }

}