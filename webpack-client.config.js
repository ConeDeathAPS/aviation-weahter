const path = require('path');

module.exports = {
    entry: './src/client/index.tsx',
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
        filename: 'app.js',
        path: path.join(__dirname, 'dist'),
    },
};