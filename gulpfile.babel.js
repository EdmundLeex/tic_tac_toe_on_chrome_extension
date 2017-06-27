import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';
import env from 'gulp-env';
import zip from 'gulp-zip';
import rename from 'gulp-rename';

const plugins = loadPlugins();

import popupWebpackConfig from './app/popup/webpack.config.js';
import eventWebpackConfig from './app/background/webpack.config.js';

gulp.task('popup-js', ['clean'], (cb) => {
  webpack(popupWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('background-js', ['clean'], (cb) => {
  webpack(eventWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('popup-html', ['clean'], () => {
  return gulp.src('app/popup/src/index.html')
    .pipe(plugins.rename('popup.html'))
    .pipe(gulp.dest('./build'))
});

gulp.task('copy-dev-manifest', ['clean'], () => {
  return gulp.src('app/manifest.development.json')
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-prod-manifest', ['clean'], () => {
  return gulp.src('app/manifest.production.json')
    .pipe(rename('manifest.json'))
    .pipe(gulp.dest('./build'));
});

gulp.task('clean', (cb) => {
  rimraf('./build', cb);
});

gulp.task('build', ['copy-dev-manifest', 'popup-js', 'popup-html', 'background-js']);

gulp.task('watch', ['default'], () => {
  gulp.watch('app/popup/**/*', ['build']);
  gulp.watch('app/background/**/*', ['build']);
  gulp.watch('app/manifest.json', ['build']);
});

gulp.task('set-production-env', () => {
  env({
    vars: {
      NODE_ENV: 'production'
    }
  });
});

gulp.task('deploy', [
  'set-production-env',
  'clean',
  'copy-prod-manifest',
  'popup-js',
  'popup-html',
  'background-js'
], () => {
  gulp.src('./build/*')
      .pipe(zip('release.zip'))
      .pipe(gulp.dest('./build'));
});

gulp.task('default', ['build']);
