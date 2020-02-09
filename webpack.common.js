const path = require('path');
// const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = {
    entry: {
        app: `./src/js/app.js`,
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, 'docs'),
    },
    plugins: [
        // new GenerateSW({
        //   swDest: 'serviceWorker.js',
        //   clientsClaim: true,
        //   skipWaiting: true,
        // }),
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