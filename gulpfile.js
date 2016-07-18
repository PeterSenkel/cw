const gulp = require('gulp');
const bower = require('gulp-bower');
const del = require('del');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const tscConfig = require('./tsconfig.json');
const typescript = require('gulp-typescript');

var config = {
    bootstrapDir: './bower_components/bootstrap-sass',
    vendors: [
        'node_modules/es6-shim/es6-shim.time.js',
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js'
    ],
    vendorMaps: [
        'node_modules/es6-shim/es6-shim.map',
        'node_modules/systemjs/dist/system-polyfills.js.map'
    ]
};

// bower
gulp.task('bower', function() {
    return bower();
});

// clean public folder
gulp.task('clean', function () {
    return del.sync(['app/public/**', '!public']);
});

// fonts
gulp.task('fonts', function() {
    return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
        .pipe(gulp.dest('app/public/fonts'));
});

// sass compile
gulp.task('sass', ['bower'], function () {
    return gulp.src('app/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass({
            style: 'compressed',
            includePaths: ['app/sass/vendor/bootstrap.scss']
        }))
        .pipe(gulp.dest('app/public/css'));
});

// typescript compile
gulp.task('compile', function () {
    return gulp.src('app/**/*.ts')
        .pipe(plumber())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(gulp.dest('app/public/js'));
});

// vendor script maps
gulp.task('maps', function() {
    gulp.src(config.vendorMaps)
        .pipe(plumber())
        .pipe(gulp.dest('app/public/js/vendor'));
});

// vendor scripts
gulp.task('vendor', ['maps'], function () {
    return gulp.src(config.vendors)
        .pipe(plumber())
        .pipe(gulp.dest('app/public/js/vendor'));
});

// watch typescript and sass
gulp.task('watch', ['build'], function () {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/components/**/*.ts', ['compile']);
});

gulp.task('build', ['clean', 'compile', 'sass', 'fonts', 'vendor']);
gulp.task('default', ['build']);
