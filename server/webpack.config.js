const path = require('path');
const nodeExternals = require('webpack-node-externals');

const entryFile = path.join(__dirname, './index.ts');
const outputDirectory = path.join(__dirname, 'distr');
const outputFilename = 'miner-server.js';
const mode = 'development';

const resolve = {
    extensions: [".ts", ".js"]
};

const rules = [{
    test: /\.tsx?$/,
    use: [{
        loader: 'ts-loader',
    }]
}];

module.exports = [
    {
        mode,
        entry: entryFile,
        target: "node",
        externals: [nodeExternals()],
        output: {
            filename: outputFilename,
            path: outputDirectory
        },
        devtool: 'inline-source-map',
        module: {
            rules
        },
        resolve
    }
]
