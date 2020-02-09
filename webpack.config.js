module.exports = {
    mode: "development",
    entry: `./src/js/index.js`,
    output: {
      path: `${__dirname}/docs/js`,
      filename: "app.js"
    },
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