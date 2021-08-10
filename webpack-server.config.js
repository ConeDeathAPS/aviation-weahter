const path = require('path');

module.exports = {
    entry: './src/server/index.ts',
    devtool: 'eval-source-map',
    target: 'node',
    externals: {
        express: 'require("express")',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'server.js',
        path: path.join(__dirname, 'dist'),
    },
};