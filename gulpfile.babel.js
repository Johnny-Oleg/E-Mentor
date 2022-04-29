import pkg from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import del from 'del';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify-es';

const { src, dest, watch, parallel, series } = pkg;
const scss = gulpSass(dartSass);
const sync = browserSync.create();

export function styles() {
	return src('src/scss/style.scss')
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(concat('style.min.css'))
		.pipe(autoprefixer({ overrideBrowserlist: ['last 10 version'], grid: true }))
		.pipe(dest('src/css'))
		.pipe(sync.stream());
}

export function watching() {
	watch(['src/scss/**/*.scss'], styles);
	watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts);
	watch(['src/*.html']).on('change', sync.reload);
}

export function syncing() {
	sync.init({
		server: {
			baseDir: 'src/',
		}
	})
}

export function scripts() {
	return src([
		'node_modules/jquery/dist/jquery.js',
		'src/js/main.js'
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify.default())
		.pipe(dest('src/js'))
		.pipe(sync.stream());
}

export function cleanDist() {
	return del('dist');
}

export function images() {
	return src('src/images/**/*')
        .pipe(imagemin(
			// [
			// 	imagemin.gifsicle({ interlaced: true }),
			// 	imagemin.mozjpeg({ quality: 75, progressive: true }),
			// 	imagemin.optipng({ optimizationLevel: 5 }),
			// 	imagemin.svgo({
			// 		plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
			// 	}),
			// ]
			)
        )
        .pipe(dest('dist/images'));
}

function building() {
	return src([
		'src/css/style.min.css',
		'src/fonts/**/*',
		'src/js/main.min.js',
		'src/*.html'
	], { base: 'src' })
		.pipe(dest('dist'));
}
console.log(imagemin);
export const build = series(cleanDist, images, building);
export default parallel(styles, scripts, syncing, watching);

// "optionalDependencies": {
//   "imagemin-gifsicle": "^5.2.0",
//   "imagemin-jpegtran": "^5.0.2",
//   "imagemin-optipng": "^5.2.1",
//   "imagemin-svgo": "^6.0.0"
// }
// If these plugins fails to install it doesnt stop gulp-imagemin to install. So first try to go to gulp-imagemin folder where its package.json sits and run npm install.

// If that doesnt fix your problem, you can try to install those plugins manualy - npm install imagemin-gifsicle.