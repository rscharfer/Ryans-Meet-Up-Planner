/*eslint-env node*/
/* eslint no-console: 0 */
/* eslint indent: 0 */
/* eslint no-mixed-spaces-and-tabs: 0 */
/* eslint quotes: 0 */



var gulp = require('gulp');
var browser = require('browser-sync').create();
var sass = require('gulp-sass');
var babel=require('gulp-babel');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify'); 
var cleanCSS = require('gulp-clean-css');
 



gulp.task('watch',['startBrowser'],function(){

	

	gulp.watch('./index.html',['browserUpdate']);

	gulp.watch('./src/ecma6/**/*.js',['scripts','browserUpdate']);
	


	gulp.watch('./sass/**/*.scss', ['styles','browserUpdate']);
});


gulp.task('styles',function(){
	return gulp.src('./src/sass/**/*.scss')
	.pipe(sass({outputStyle:'compressed'}).on('error',sass.logError))
	.pipe(gulp.dest('./dist/css'));
});


gulp.task('vendors',function(){

	return gulp.src(['./src/css/vendors/normalize.css','./src/css/vendors/main.css'])
			.pipe(concat('vendor.css'))
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(gulp.dest('./dist/css'));
});

// gulp.task('js', () => {
//     return gulp.src('./ecma6/**/*.js')
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         .pipe(gulp.dest('js'));
// });

gulp.task('browserUpdate',function(){

	browser.reload();

});

gulp.task('startBrowser',function(){

	browser.init({
		server:'./',
		debug:true
	});
});


gulp.task('scripts',function(){
	gulp.src(['./src/ecma6/formatTime.js','./src/ecma6/main.js'])
	.pipe(concat('scripts.js'))
	.pipe(babel({
            presets: ['es2015']
        }))
	.pipe(gulp.dest('./dist/js'))
	.pipe(rename('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));
});









