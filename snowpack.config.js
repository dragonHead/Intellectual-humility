module.exports = {
    mount: {
      src: {url: "/"},
      public: { url: '/', static: true }
    },
    alias: {
      "@app": "./src"
    },
    buildOptions: {
        out: "./docs"
    },
    optimize: {
      bundle: true,
      minify: true,
      target: 'es2020',
    },
  };