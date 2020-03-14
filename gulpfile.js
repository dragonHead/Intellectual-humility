const { src, dest, series, parallel, watch } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");
const concat = require('gulp-concat');
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackDevConfig = require("./webpack.dev.js");
const webpackProdConfig = require("./webpack.prod.js");
const jsonmin = require("gulp-jsonminify");
const connect = require("gulp-connect");
const del = require("del");

const paths = {
  srcDir: "./src",
  distDir: "./docs"
};

// clean
const clean = () => del([`${paths.distDir}/**`, "!dist"], { force: true });

// html
function html() {
  return src(`${paths.srcDir}/**/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(paths.distDir));
}

// sitemap.xml
function xml() {
  return src(`${paths.srcDir}/sitemap.xml`).pipe(dest(paths.distDir));
}

// robts
function robots() {
  return src(`${paths.srcDir}/robots.txt`).pipe(dest(paths.distDir));
}

function img() {
  return src(`${paths.srcDir}/img/**/*.+(png|jpeg|jpg|svg)`)
    .pipe(dest(`${paths.distDir}/img`));
}

function css() {
  return src(`${paths.srcDir}/css/**/*.css`)
    .pipe(cleanCSS())
    .pipe(concat('app.css'))
    .pipe(dest(`${paths.distDir}/css`));
}

// js
function devjs() {
  return webpackStream(webpackDevConfig, webpack)
    .pipe(dest(`${paths.distDir}`));
}

function prodjs() {
  return webpackStream(webpackProdConfig, webpack)
    .pipe(dest(`${paths.distDir}`));
}

// manifest.json
function pwajson() {
  return src(`${paths.srcDir}/manifest.json`)
    .pipe(jsonmin())
    .pipe(dest(paths.distDir));
}

// watch
function wt() {
  watch("./src/**/*.html", series(html));
  watch("./src/sitemap.xml", series(xml));
  watch("./src/robots.txt", series(robots));
  watch("./src/manifest.json", series(pwajson));
  watch("./src/css/**/*.css", series(css));
  watch("./src/js/**/*.js", series(devjs));
}

function server() {
  connect.server({
    root: paths.distDir,
    host: "0.0.0.0",
    port: "8080",
    debug: true
  });
}

const devbuild = series(
  clean,
  parallel(
    html
    ,robots
    ,xml
    ,img
    ,pwajson
    ,devjs
    ,css
  ),
);

const prodbuild = series(
  clean,
  parallel(
    html
    ,robots
    ,xml
    ,img
    ,pwajson
    ,prodjs
    ,css
  ),
);

const prod = series(prodbuild);
const dev = series(devbuild, parallel(wt, server));

exports.default = prod;
exports.dev = dev;
