/*eslint-env node*/
/*above is an eslint configuration local to this file */
/*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */


var gulp = require('gulp');
var browser = require('browser-sync').create();


gulp.task('default',function(){

	console.log('Hello!');
});


gulp.task('watch',function(){

	browser.init({
		server: './',
		debug:true
	});

	gulp.watch('./index.html',function(){

		browser.reload();
	});
});








