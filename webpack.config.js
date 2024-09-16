import { watch } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
    {
        mode: 'development',
        name: 'dev',
        entry: './src/js/app.js',
        output: {
            path: path.resolve(__dirname, 'dist/js'),
            filename: 'app.bundle.js',
        }, 
        module: {
            rules: [
              {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              },
            ],
        },
        watch: true,
        devtool: false
    },
    {
        mode: 'production',
        name: 'prod',
        entry: './src/js/app.js',
        output: {
            path: path.resolve(__dirname, 'dist/js'),
            filename: 'app.bundle.min.js',
        },
        module: {
            rules: [
              {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              },
            ],
        },
        watch: true
    }
];