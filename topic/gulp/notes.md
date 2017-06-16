`gulp-concat` - this function concatenates the given files.

```javascript
gulp.src(['file1', 'file2'])
    .pipe(concat('filename'));

gulp.src(['*.txt'])
    .pipe(concat('filename'));
```

`gulp-clean` - 

--- 

`gulp.src` - 
    { read: false } - option that tells gulp to skip reading the content of the files
