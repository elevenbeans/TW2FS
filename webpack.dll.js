const webpack = require('webpack');
const path = require('path');

const vendors = [
    'react',
    'react-dom',
    'react-router'
    // ...其它库
];

module.exports = {
    entry: {
        "flight": vendors,
    },
    output: {
        path: './dist',
        filename: 'dll.[name].js'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "manifest.json"),
            name: '[name]',
            context: __dirname,
        }),
    ],
};
