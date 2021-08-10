const path = require('path');

module.exports = {
    entry: './src/index.ts',
    devtool: 'eval',
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
        filename: 'index.js',
        path: path.join(__dirname, 'dist'),
    },
};