const path = require('path');
const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = {
    entry: {
        app: `./src/js/app.js`,
    },
    output: {
      filename: "js/[name].js",
      path: path.resolve(__dirname + '/docs'),
    },
    plugins: [
        new GenerateSW({
          include: [/\.(?:html|css|js|png)$/],
          runtimeCaching: [{
            urlPattern: /\.(?:html|css|js|png)$/,
            handler: 'CacheFirst',
          }],
          swDest: 'serviceWorker.js',
          clientsClaim: true,
          skipWaiting: true,
        }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
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