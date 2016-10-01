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
 



// gulp.task('watch',['startBrowser'],function(){

	

// 	gulp.watch('./index.html',['browserUpdate']);

// 	gulp.watch('./src/ecma6/**/*.js',['scripts','browserUpdate']);
	


// 	gulp.watch('./sass/**/*.scss', ['styles','browserUpdate']);
// });


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

gulp.task('startDevBrowser',function(){

	browser.init({
		server:'./src',
		debug:true
	});
});


gulp.task('startDistBrowser',function(){

	browser.init({
		server:'./dist',
		debug:true
	});
});


gulp.task('babelize',function(){
	return gulp.src(['./src/ecma6/formatTime.js','./src/ecma6/main.js'])
	.pipe(babel({
            presets: ['es2015']
        }))
	.pipe(gulp.dest('./src/js'));
});


// gulp.task('unsass',function(){

// 	 gulp.src('./src/sass/**/.css')
// 	.pipe(sass()).on('error',sass.logError)
// 	.pipe(gulp.dest('./src/css'));


// });

gulp.task('unsass',function(){

	 gulp.src('./src/sass/**/*.scss')
	.pipe(sass()).on('error',sass.logError)
	.pipe(gulp.dest('./src/css'));



});


gulp.task('serve',['startDevBrowser'],function(){

	

	gulp.watch('./src/index.html',['updateHTML','browserUpdate']);

	gulp.watch('./src/ecma6/**/*.js',['jsDistribute','browserUpdate']);
	


	gulp.watch('./src/sass/**/*.scss', ['cssDistribute','browserUpdate']);
});


gulp.task('cssDistribute',['unsass'],function(){

	gulp.src(['./src/css/vendors/normalize.css','./src/css/vendors/main.css','./src/css/styles.css'])
	.pipe(concat('styles.css'))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest('./dist/css'));

});


gulp.task('jsDistribute',['babelize'],function(){

	gulp.src(['./src/js/formatTime.js','./src/js/main.js'])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));

});


gulp.task('serve:dist',['startDevBrowser'],function(){

	
});


gulp.task('updateHTML',function(){


	gulp.src('./src/index.html')
	.pipe(HTMLreplace({
        'css': './dist/css/styles.css',
        'js': './dist/js/scripts.min.js'
    }))
	.pipe(gulp.dest('./dist'));
});















