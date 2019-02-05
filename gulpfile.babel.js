
import {
  src, dest, series, parallel,
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
    .pipe(jsonmin())
    .pipe(dest(paths.distDir));
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

export default build;
