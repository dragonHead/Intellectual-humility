const { src, dest, series, parallel, watch } = require('gulp')
// const gutil = require('gulp-util')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const plumber = require('gulp-plumber')
const jsonmin = require('gulp-jsonminify')
const webserver = require('gulp-webserver')
const workbox = require('workbox-build')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const del = require('del')
// const DevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config')

const paths = {
  srcDir: './src',
  distDir: './docs'
}

// clean
const clean = () =>
  del([`${paths.distDir}/**`, '!dist'], { force: true })

// html
function html () {
  return src(`${paths.srcDir}/**/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(paths.distDir))
}

// sitemap.xml
function xml () {
  return src(`${paths.srcDir}/sitemap.xml`).pipe(dest(paths.distDir))
}

// robts
function robots () {
  return src(`${paths.srcDir}/robots.txt`).pipe(dest(paths.distDir))
}

function img () {
  return src(`${paths.srcDir}/img/**/*.+(png|jpeg|jpg|svg)`)
    .pipe(imagemin())
    .pipe(dest(`${paths.distDir}/img`))
}

function css () {
  return src(`${paths.srcDir}/css/**/*.css`)
    .pipe(cleanCSS())
    .pipe(dest(`${paths.distDir}/css`))
}

function generateServiceWorker () {
  return workbox
    .generateSW({
      globDirectory: `${paths.distDir}`,
      globPatterns: ['**/*.{html,css,js}'],
      swDest: `${paths.srcDir}/serviceWorker.js`,
      clientsClaim: true,
      skipWaiting: true
    })
    .then(({ warnings }) => {
      for (const warning of warnings) {
        console.warn(warning)
      }
      console.info('Service worker generation completed.')
    })
    .catch(error => {
      console.warn('Service worker generation failed:', error)
    })
}

// service worker
function pwajs () {
  return src(`${paths.srcDir}/*.js`)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(dest(paths.distDir))
}

// manifest.json
function pwajson () {
  return src(`${paths.srcDir}/manifest.json`)
    .pipe(jsonmin())
    .pipe(dest(paths.distDir))
}

// webpack
function webpackbuild () {
  webpackConfig.mode = 'production'
  return webpackStream(webpackConfig, webpack).pipe(
    dest(`${paths.distDir}/js/`)
  )
}

function webpackbuilddev () {
  return webpackStream(webpackConfig, webpack).pipe(
    dest(`${paths.distDir}/js/`)
  )
}

// watch
function wt () {
  watch('./src/**/*.html', series(html))
  watch('./src/sitemap.xml', series(xml))
  watch('./src/robots.txt', series(robots))
  watch('./src/manifest.json', series(pwajson))
  watch('./src/css/**/*.css', series(css))
  watch('./src/js/**/*.js', series(webpackbuilddev))
}

function server () {
  return src(paths.distDir).pipe(
    webserver({
      host: 'localhost',
      port: '8080',
      livereload: true,
      open: true
    })
  )
}
/*
function webpackDevServer() {
  new DevServer(webpack(webpackConfig)).listen(8080, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/index.html');
  });
} */

const build = series(
  clean,
  parallel(html, robots, xml, pwajson, css, img),
  generateServiceWorker,
  pwajs
)

const prod = series(build, webpackbuild)

const dev = series(build, webpackbuilddev, parallel(wt, server))

exports.default = prod
exports.dev = dev
