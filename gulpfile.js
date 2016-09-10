/*eslint-env node*/
/*above is an eslint configuration local to this file */
/*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */


var gulp = require('gulp');
var browser = require('browser-sync').create();
var sass = require('gulp-sass');



gulp.task('watch',['startBrowser'],function(){

	

	gulp.watch('./index.html',['browserUpdate']);

	gulp.watch('./sass/**/*.scss', ['styles','browserUpdate']);
});


gulp.task('styles',function(){
	gulp.src('./sass/**/*.scss')
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest('./css'));
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











