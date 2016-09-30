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


gulp.task('watch',['startBrowser'],function(){

	

	gulp.watch('./index.html',['browserUpdate']);

	gulp.watch('./src/ecma6/**/*.js',['scripts','browserUpdate']);
	


	gulp.watch('./sass/**/*.scss', ['styles','browserUpdate']);
});


gulp.task('styles',function(){
	gulp.src('./sass/**/*.scss')
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest('./css'));
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
	gulp.src('./src/ecma6/**/*.js')
	.pipe(babel({
            presets: ['es2015']
        }))
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('./dist/js'))
	.pipe(rename('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));
});









