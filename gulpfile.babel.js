
import {
  gulp, src, dest, series, parallel, watch,
} from 'gulp';
import htmlmin from 'gulp-htmlmin';
import jsonmin from 'gulp-jsonminify';
import del from 'del';

const paths = {
  srcDir: './src',
  distDir: './docs',
};

// clean
export const clean = () => del([`${paths.distDir}/**`, '!dist'], { force: true });

// html
export function html() {
  return src(`${paths.srcDir}/**/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(paths.distDir));
}

// robts
export function robots() {
  return src(`${paths.srcDir}/robots.txt`)
    .pipe(dest(paths.distDir));
}

// sitemap.xml
export function xml() {
  return src(`${paths.srcDir}/sitemap.xml`)
    .pipe(dest(paths.distDir));
}

// manifest.json
export function json() {
  return src(`${paths.srcDir}/manifest.json`)
//    .pipe(jsonmin())
    .pipe(dest(paths.distDir));
}

// watch
export function wt() {
  watch('./src/**/*.html', series(html));
  watch('./src/sitemap.xml', series(xml));
  watch('./src/robots.txt', series(robots));
  watch('./src/manifest.json', series(json));
}

const build = series(
  clean,
  parallel(
    html,
    robots,
    xml,
    json,
  ),
);

const develop = series(
  build,
  wt,
);

exports.default = build;
exports.dev = develop;
