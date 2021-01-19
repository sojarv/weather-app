const path = require('path');

module.exports = {
    mode: 'none',
    entry: './js/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};