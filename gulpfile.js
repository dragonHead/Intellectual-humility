const { src, dest, series, parallel, watch } = require("gulp");
// const gutil = require('gulp-util')
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const jsonmin = require("gulp-jsonminify");
const gzip = require("gulp-gzip");
const webserver = require("gulp-webserver");
const workbox = require("workbox-build");
const del = require("del");

const paths = {
  srcDir: "./src",
  distDir: "./docs"
};

// clean
const clean = () => del([`${paths.distDir}/**`, "!dist"], { force: true });

// html
function html() {
  return (
    src(`${paths.srcDir}/**/*.html`)
      //.pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(dest(paths.distDir))
  );
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
    .pipe(imagemin())
    .pipe(dest(`${paths.distDir}/img`));
}

function css() {
  return (
    src(`${paths.srcDir}/css/**/*.css`)
      .pipe(cleanCSS())
      //.pipe(gzip())
      .pipe(dest(`${paths.distDir}/css`))
  );
}

// js
function js() {
  return (
    src(`${paths.srcDir}/resources/js/**/*.js`)
      .pipe(plumber())
      // .pipe(babel())
      // .pipe(concat(jsfiles.zen, { newLine: "\n\n" }))
      .pipe(uglify())
      //.pipe(gzip())
      .pipe(dest(`${paths.distDir}/resources/js`))
  );
}

function generateServiceWorker() {
  return workbox
    .generateSW({
      globDirectory: `${paths.distDir}`,
      globPatterns: ["**/*.{html,css,js}"],
      swDest: `${paths.srcDir}/serviceWorker.js`,
      clientsClaim: true,
      skipWaiting: true
    })
    .then(({ warnings }) => {
      for (const warning of warnings) {
        console.warn(warning);
      }
      console.info("Service worker generation completed.");
    })
    .catch(error => {
      console.warn("Service worker generation failed:", error);
    });
}

// service worker
function pwajs() {
  return src(`${paths.srcDir}/*.js`)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(dest(paths.distDir));
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
  watch("./src/js/**/*.js", series(js));
}

function server() {
  return src(paths.distDir).pipe(
    webserver({
      host: "localhost",
      port: "8080",
      livereload: true
    })
  );
}

const build = series(
  clean,
  parallel(html, robots, xml, pwajson, js, css, img),
  generateServiceWorker,
  pwajs
);

const prod = series(build);

const dev = series(build, parallel(wt, server));

exports.default = prod;
exports.dev = dev;
