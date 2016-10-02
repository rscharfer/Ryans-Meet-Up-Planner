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
var uglify = require('gulp-uglify'); 
var cleanCSS = require('gulp-clean-css');
var HTMLreplace = require('gulp-html-replace');
var rename = require('gulp-rename');
 




// unsass what I have in my scss folder and place in source css file

gulp.task('unsass',function(){

	 gulp.src('./src/sass/**/*.scss')
	.pipe(sass()).on('error',sass.logError)
	.pipe(gulp.dest('./src/css'));



});

// takes all css in source folder, concatenates it, minimizes it, and places it in dist folder

gulp.task('cssDistribute',['unsass'],function(){

	gulp.src(['./src/css/vendors/normalize.css','./src/css/vendors/main.css','./src/css/styles.css'])
	.pipe(concat('styles.css'))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(rename('styles.min.css'))
	.pipe(gulp.dest('./dist/css'));

});


// babelize both of the ecma script 6 files and place them in src js folder

gulp.task('babelize',function(){
	return gulp.src(['./src/ecma6/formatTime.js','./src/ecma6/main.js'])
	.pipe(babel({
            presets: ['es2015']
        }))
	.pipe(gulp.dest('./src/js'));
});


gulp.task('jsDistribute',['babelize'],function(){

	gulp.src(['./src/js/formatTime.js','./src/js/main.js'])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));

});




// copy the index file from src to dist, replacing the source files with the dist files


gulp.task('updateHTML',function(){


	gulp.src('./src/index.html')
	.pipe(HTMLreplace({
        'css': './css/styles.min.css',
        'js': './js/scripts.min.js'
    }))
	.pipe(gulp.dest('./dist'));
});




// starts dev browser

gulp.task('startDevBrowser',function(){

	browser.init({
		server:'./src',
		debug:true
	});
});

// starts dist browser
gulp.task('startDistBrowser',function(){

	browser.init({
		server:'./dist',
		debug:true
	});
});


// updates browser

gulp.task('browserUpdate',function(){

	browser.reload();

});







// watch for changes in index, ecma6 folder, sass folder, update all files
// in src and distribution folders and reload browser

gulp.task('serve',['startDevBrowser'],function(){

	

	gulp.watch('./src/index.html',['updateHTML','browserUpdate']);

	gulp.watch('./src/ecma6/**/*.js',['jsDistribute','browserUpdate']);
	


	gulp.watch('./src/sass/**/*.scss', ['cssDistribute','browserUpdate']);
});





// start distribution browser


gulp.task('serve:dist',['startDistBrowser'],function(){

	
});


















