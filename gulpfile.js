Gulp = {
	self        : null,
	uglify      : null,
	cssmin      : null,
	sass        : null,
	svgo        : null,
	concat      : null,
	imagemin    : null,
	browserSync : null,
	init: function(){
		Gulp.self        = require('gulp')
		Gulp.uglify      = require('gulp-uglify')
		Gulp.cssmin      = require('gulp-cssmin')
		Gulp.sass        = require('gulp-sass')
		Gulp.svgo        = require('gulp-svgo')
		Gulp.concat      = require('gulp-concat')
		Gulp.imagemin    = require('gulp-imagemin')
		Gulp.browserSync = require('browser-sync').create()
		Gulp.svgopt()
		Gulp.scss()
		Gulp.css()
		Gulp.js()
		Gulp.jslibs()
		Gulp.watch()
		Gulp.wsass()
		Gulp.default()
		Gulp.imgmin()
		Gulp.startServer()
	},
	startServer: () => {
		Gulp.self.task('serve', () => {
			console.log('[INICIANDO BrowserSync]');
			Gulp.browserSync.init({
				server: './'
			})
			Gulp.self.watch('./assets/scss/**', ['scss'])
			Gulp.self.watch('./*.html').on('change', Gulp.browserSync.reload)
			Gulp.self.watch('./js/**/*.js').on('change', Gulp.browserSync.reload)
		})
	},
	imgmin: () => {
		Gulp.self.task('imgmin', () => {
			console.log('[IMAGEMIN] Otimizando as Imagens')
			Gulp.self.src('./assets/images/**/*')
			.pipe(Gulp.imagemin())
			.pipe(Gulp.self.dest('./assets/images/'))
		})
	},
	svgopt: () => {
		Gulp.self.task('svgopt', () => {
			console.log('[SVGO] Otimizando arquivos SVG')
			Gulp.self.src('./assets/images/**/*.svg')
			.pipe(Gulp.svgo())
			.pipe(Gulp.self.dest('./assets/images'))
		})
	},
	scss: () => {
		Gulp.self.task('scss', () => {
			console.log('[SASS] Compilando Arquivos do Sass');
			Gulp.self.src('./assets/scss/base/base.scss')
			.pipe(Gulp.sass())
			.pipe(Gulp.self.dest('./assets/css/src/base'))
			.pipe(Gulp.browserSync.stream())

			Gulp.self.src('./assets/scss/pages/**/*.scss')
			.pipe(Gulp.sass())
			.pipe(Gulp.self.dest('./assets/css/src/pages'))
			.pipe(Gulp.browserSync.stream())
		})
	},
	css: () => {
		Gulp.self.task('css', () => {
			console.log('[CSS] Minificando Arquivos CSS');
			Gulp.self.src('./assets/css/src/**/*.css')
			.pipe(Gulp.cssmin())
			.pipe(Gulp.self.dest('./assets/css/dist'))
		});
	},
	js: () => {
		Gulp.self.task('js', () => {
			console.log('[JS] Minificando Arquivos JavaScript');
			Gulp.self.src(['./js/src/**/*.js', '!js/dist/**'])
			.pipe(Gulp.uglify())
			.pipe(Gulp.self.dest('./js/dist'))
		});
	},
	jslibs: () => {
		Gulp.self.task('jslibs', () => {
			console.log('[JS] Unindo Libs Js');
			Gulp.self.src(['./js/src/jquery/jquery.js', './js/src/bootstrap/bootstrap.js',  './js/src/libs/**/*.js'])
			.pipe(Gulp.uglify())
			.pipe(Gulp.concat('all.js'))
			.pipe(Gulp.self.dest('./js/src/all/'))
		});
	},
	default: () => {
		Gulp.self.task('default', ['js', 'scss', 'css', 'svgopt', 'jslibs', 'imgmin', 'serve']);
	},
	watch: () => {
		Gulp.self.task('watch', () => {
			Gulp.self.watch('./js/**/*.js', ['js', 'jslibs']);
			Gulp.self.watch('./assets/css/src/**', ['css']);
			Gulp.self.watch('./assets/scss/**', ['scss']);
			Gulp.self.watch('./assets/images/**/*.svg', ['svgo']);
		});
	},
	wsass: () => {
		Gulp.self.task('wsass', () => {
			Gulp.self.watch('./assets/scss/**', ['scss']);
		});
	}
}

Gulp.init();