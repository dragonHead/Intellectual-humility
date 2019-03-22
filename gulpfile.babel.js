'use strict'

import { src, dest, series, parallel, watch } from 'gulp'
// import gutil from 'gulp-util';
import htmlmin from 'gulp-htmlmin'
import imagemin from 'gulp-imagemin'
import cleanCSS from 'gulp-clean-css'
import uglify from 'gulp-uglify'
import plumber from 'gulp-plumber'
import jsonmin from 'gulp-jsonminify'
import webserver from 'gulp-webserver'
import workbox from 'workbox-build'
import webpackStream from 'webpack-stream'
import webpack from 'webpack'
import del from 'del'
// import DevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config'

const paths = {
  srcDir: './src',
  distDir: './docs'
}

// clean
export const clean = () =>
  del([`${paths.distDir}/**`, '!dist'], { force: true })

// html
export function html () {
  return src(`${paths.srcDir}/**/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(paths.distDir))
}

// sitemap.xml
export function xml () {
  return src(`${paths.srcDir}/sitemap.xml`).pipe(dest(paths.distDir))
}

// robts
export function robots () {
  return src(`${paths.srcDir}/robots.txt`).pipe(dest(paths.distDir))
}

export function img () {
  return src(`${paths.srcDir}/img/**/*.+(png|jpeg|jpg|svg)`)
    .pipe(imagemin())
    .pipe(dest(`${paths.distDir}/img`))
}

export function css () {
  return src(`${paths.srcDir}/css/**/*.css`)
    .pipe(cleanCSS())
    .pipe(dest(`${paths.distDir}/css`))
}

export function generateServiceWorker () {
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
export function pwajs () {
  return src(`${paths.srcDir}/*.js`)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(dest(paths.distDir))
}

// manifest.json
export function pwajson () {
  return src(`${paths.srcDir}/manifest.json`)
    .pipe(jsonmin())
    .pipe(dest(paths.distDir))
}

// webpack
export function webpackbuild () {
  webpackConfig.mode = 'production'
  return webpackStream(webpackConfig, webpack).pipe(
    dest(`${paths.distDir}/js/`)
  )
}

export function webpackbuilddev () {
  return webpackStream(webpackConfig, webpack).pipe(
    dest(`${paths.distDir}/js/`)
  )
}

// watch
export function wt () {
  watch('./src/**/*.html', series(html))
  watch('./src/sitemap.xml', series(xml))
  watch('./src/robots.txt', series(robots))
  watch('./src/manifest.json', series(pwajson))
  watch('./src/css/**/*.css', series(css))
  watch('./src/js/**/*.js', series(webpackbuilddev))
}

export function server () {
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
export function webpackDevServer() {
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
