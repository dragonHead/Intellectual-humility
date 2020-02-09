const path = require('path');
const {GenerateSW} = require('workbox-webpack-plugin');
const dist = path.resolve(__dirname, 'docs/');

module.exports = {
    entry: {
        app: `./src/js/index.js`,
    },
    output: {
        path: path.resolve(dist, 'js'),
        filename: "app.js"
    },
    plugins: [
        new GenerateSW({
          swDest: dist + '/serviceWorker.js',
          clientsClaim: true,
          skipWaiting: true,
        }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                ]
              }
            }
          ]
        }
      ]
    }
  };