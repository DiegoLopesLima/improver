const

	gulp = require('gulp'),

	gulpBabel = require('gulp-babel'),

	gulpSourcemaps = require('gulp-sourcemaps'),

	gulpConcat = require('gulp-concat'),

	gulpJest = require('gulp-jest').default,

	sourcePath = './src',

	distributionPath = './dist';

gulp

	.task('test', () => {

		gulp

			.src(sourcePath)

			.pipe(gulpJest({
				coverage: true,
				coverageReporters: ['text'],
				verbose: true
			}));

	})

	.task('build', () => {

		gulp

			.src(`${sourcePath}/improver.js`)

			.pipe(gulpSourcemaps.init())

			.pipe(gulpConcat('improver.min.js'))

			.pipe(
				gulpBabel({
					presets: ['es2015'],
					compact: true
				})
			)

			.pipe(gulpSourcemaps.write('.'))

			.pipe(gulp.dest(distributionPath));

	})

	.task('watch', () => {

		gulp.watch(`${sourcePath}/improver.js`, ['build']);

		gulp.watch([`${sourcePath}/improver.js`, `${sourcePath}/improver.test.js`], ['test']);

	})

	.task('default', ['build']);
