const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
    devServer: {
        inline: true,
        hot: true,
        port: 8080
    }
});