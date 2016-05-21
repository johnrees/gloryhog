'use strict';

var gulp = require('gulp'),
    del = require('del'),
    merge = require('merge-stream'),
    concat = require('gulp-concat'),

    tsc = require('gulp-typescript'),
    jsMin = require('gulp-uglify'),

    sass = require('gulp-sass'),
    cssPrefix = require('gulp-autoprefixer'),
    cssMin = require('gulp-cssnano'),

    imageMin = require('gulp-imagemin'),

    paths = {
        scss_base: 'node_modules/scss-base/src',
        vendor: [
            'node_modules/phaser/dist/phaser.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/systemjs/dist/system.js'
        ],
        tsConfig: 'src/tsconfig.json',
        ts: 'src/**/*.ts',
        html: 'src/**/*.html',
        images: 'src/assets/images/**/*.png',
        atlases: 'src/assets/images/**/*.json',
        scss: 'src/scss/**/*.scss',
        audio: 'src/assets/audio/**/*.*',
        scssMain: 'src/scss/main.scss',
        tilemaps: 'src/assets/tilemaps/*.json'
    };

gulp.task('clean', () => del('dist/'));

gulp.task('html', () => {
    return gulp.src(paths.html)
        .pipe(gulp.dest('dist/'));
});

gulp.task('tsc', () => {
    let tsProject = tsc.createProject(paths.tsConfig);
    let tsResult = tsProject.src().pipe(tsc(tsProject));

    return tsResult.js.pipe(gulp.dest('dist/game/'));
});

gulp.task('scss', () => {
    return gulp.src(paths.scssMain)
        .pipe(sass({
            precision: 10,
            includePaths: [ paths.scss_base ]
        }))
        .pipe(concat('styles.css'))
        .pipe(cssPrefix())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('vendor', () => {
    return gulp.src(paths.vendor)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('images', () => {
    return gulp.src(paths.atlases)
        // .pipe(imageMin())
        .pipe(gulp.dest('dist/assets/images/'));
});

gulp.task('audio', () => {
    return gulp.src(paths.audio)
        // .pipe(imageMin())
        .pipe(gulp.dest('dist/assets/audio/'));
});


gulp.task('atlases', () => {
    return gulp.src(paths.images)
        // .pipe(imageMin())
        .pipe(gulp.dest('dist/assets/images/'));
});

gulp.task('tilemaps', () => {
    return gulp.src(paths.tilemaps)
        .pipe(gulp.dest('dist/assets/tilemaps/'));
});

gulp.task('minify', () => {
    let js = gulp.src('dist/**/*.js')
        .pipe(jsMin())
        .pipe(gulp.dest('dist/'));
    let css = gulp.src('dist/css/styles.css')
        .pipe(cssMin())
        .pipe(gulp.dest('dist/css/'));

    return merge(js, css);
});

gulp.task('watch', () => {
    let watchScss   = gulp.watch(paths.scss, ['scss']),
        watchHtml   = gulp.watch(paths.html, ['html']),
        watchTs     = gulp.watch(paths.ts, ['tsc']),
        watchImages = gulp.watch(paths.images, ['images']),
        watchAtlases = gulp.watch(paths.images, ['atlases']),
        watchTilemaps = gulp.watch(paths.tilemaps, ['tilemaps']),
        watchAudio = gulp.watch(paths.audio, ['audio']),

        onChanged = (event) => console.log('File ' + event.path + ' was ' +
            event.type + '. Running tasks...');

    watchScss.on('change', onChanged);
    watchHtml.on('change', onChanged);
    watchTs.on('change', onChanged);
    watchImages.on('change', onChanged);
    watchAtlases.on('change', onChanged);
    watchTilemaps.on('change', onChanged);
    watchAudio.on('change', onChanged);
});

gulp.task('default', [ 'html', 'tsc', 'scss', 'vendor', 'images', 'tilemaps', 'audio' ]);
