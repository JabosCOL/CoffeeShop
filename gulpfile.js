const { src, dest, watch, series, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('cssnano')


const css = (done) => {
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
    done()
}

const images = (done) => {
    src('src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'))
    done()
}

const webpImage = () => {
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp({quality: 50}))
        .pipe(dest('build/img'))
}

const avifImage = () => {
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif({quality: 50}))
        .pipe(dest('build/img'))
}


const dev = () => {
    watch('src/scss/**/*.scss', css)
    watch('src/img/**/*', images)
}

exports.css = css
exports.images = images
exports.webpImage = webpImage
exports.avifImage = avifImage
exports.dev = dev
exports.default = series(images, webpImage, avifImage, css, dev)