const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",

    entry: "./src/engine.js",

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },

    module: {
        rules: [
            //
            // utils/*.js — treat as ES modules
            //
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "utils"),
                type: "javascript/esm"
            },

            //
            // src/*.js — treat as ES modules
            //
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                type: "javascript/esm"
            }
        ]
    },

    plugins: [
        //
        // Generate dist/index.html from root index.html
        //
        new HtmlWebpackPlugin({
            template: "index.html",
            inject: "body"
        }),

        //
        // Copy CSS and ACE assets into dist/
        //
        new CopyWebpackPlugin({
            patterns: [
                { from: "css", to: "css" },
                {
                    from: "node_modules/ace-builds/src-noconflict",
                    to: "ace"
                }
            ]
        })
    ],

    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist")
        },
        port: 8080,
        open: true
    },

    resolve: {
        extensions: [".js"],
        modules: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "utils"),
            "node_modules"
        ]
    }
};
