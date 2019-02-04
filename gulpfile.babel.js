
import {
  src, dest, series, parallel,
} from 'gulp';
import htmlmin from 'gulp-htmlmin';
import del from 'del';

const paths = {
  srcDir: './src',
  distDir: './docs',
};

export const clean = () => del([`${paths.distDir}/**`, '!dist'], { force: true });

export function html() {
  return src(`${paths.srcDir}/**/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(paths.distDir));
}

const build = series(
  clean,
  parallel(
    html,
  ),
);

export default build;
