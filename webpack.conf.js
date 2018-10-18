var nodeExternals = require('webpack-node-externals')
var path = require('path')
module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'bin'),
        filename: 'server.js'
    },
    resolve: {
        extensions: ['.ts'] //resolve all the modules other than index.ts
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                exclude: /node_modules/,
                test: /\.ts?$/
            },
        ]
    }
}
