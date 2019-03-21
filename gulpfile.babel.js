
import {
  gulp, src, dest, series, parallel, watch,
} from 'gulp';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import jsonmin from 'gulp-jsonminify';
import workbox from 'workbox-build';
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

// sitemap.xml
export function xml() {
  return src(`${paths.srcDir}/sitemap.xml`)
    .pipe(dest(paths.distDir));
}

// robts
export function robots() {
  return src(`${paths.srcDir}/robots.txt`)
    .pipe(dest(paths.distDir));
}

export function img() {
  return src(`${paths.srcDir}/img/**/*.+(png|jpeg|jpg|svg)`)
    .pipe(imagemin())
    .pipe(dest(`${paths.distDir}/img`));
}

export function css() {
  return src(`${paths.srcDir}/css/**/*.css`)
    .pipe(cleanCSS())
    .pipe(dest(`${paths.distDir}/css`));
}

export function generateServiceWorker() {
  return workbox.generateSW({
    globDirectory: `${paths.distDir}`,
    globPatterns: ['**/*.{html,css,js}'],
    swDest: `${paths.srcDir}/serviceWorker.js`,
    clientsClaim: true,
    skipWaiting: true,
  }).then(({warnings}) => {
    for (const warning of warnings) {
      console.warn(warning);
    }
    console.info('Service worker generation completed.');
  }).catch((error) => {
    console.warn('Service worker generation failed:', error);
  });
}

// service worker
export function pwajs() {
  return src(`${paths.srcDir}/*.js`)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(dest(paths.distDir));
}

// manifest.json
export function pwajson() {
  return src(`${paths.srcDir}/manifest.json`)
    .pipe(jsonmin())
    .pipe(dest(paths.distDir));
}

// watch
export function wt() {
  watch('./src/**/*.html', series(html));
  watch('./src/sitemap.xml', series(xml));
  watch('./src/robots.txt', series(robots));
  watch('./src/manifest.json', series(pwajson));
  watch('./src//css/**/*.css', series(css));
}

const build = series(
  clean,
  parallel(
    html,
    robots,
    xml,
    pwajson,
    css,
    img,
  ),
  generateServiceWorker,
  pwajs,
);

const develop = series(
  build,
  wt,
);

exports.default = build;
exports.dev = develop;
