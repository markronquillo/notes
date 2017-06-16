var gulp = require('gulp'),
    concat = require('gulp-concat')
    ;

gulp.task('concat', function() {
    gulp.src(['concat/txt1.txt', 'concat/txt2.txt'])
        .pipe(concat('result.txt'))
        .pipe(gulp.dest('./concat'))
        ;
});

gulp.task('concat-star', function() {
    gulp.src(['concat/*.txt', 'concat/*.txt'])
        .pipe(concat('result.txt'))
        .pipe(gulp.dest('./concat'))
        ;
});