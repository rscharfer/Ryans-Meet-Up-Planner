/*eslint-env node*/
/*above is an eslint configuration local to this file */
/*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */


var gulp = require('gulp');
var browser = require('browser-sync').create();
var sass = require('gulp-sass');
var babel=require('gulp-babel');


gulp.task('watch',['startBrowser'],function(){

	

	gulp.watch('./index.html',['browserUpdate']);

	gulp.watch('./ecma6/**/*.js',['js','browserUpdate']);
	


	gulp.watch('./sass/**/*.scss', ['styles','browserUpdate']);
});


gulp.task('styles',function(){
	gulp.src('./sass/**/*.scss')
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest('./css'));
});

gulp.task('js', () => {
    return gulp.src('./ecma6/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('js'));
});

gulp.task('browserUpdate',function(){

	browser.reload();

});

gulp.task('startBrowser',function(){

	browser.init({
		server:'./',
		debug:true
	});
});











