if (!process.env.NODE_ENV) throw new Error('You must set the NODE_ENV environment variable');

const path = require('path');

const DEV_DIR = "./dev";
const JSX_DIR = `${DEV_DIR}/jsx`;
const PROD_DIR = "./prod";
const JS_DIR = `${PROD_DIR}/js`;

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        react: `${JSX_DIR}/index.jsx`,
    },
    output: {
        path: path.resolve(__dirname, JS_DIR), 
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /.jsx$/,
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        ],
    }
}
            
