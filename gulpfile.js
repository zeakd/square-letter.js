var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('default', function () {

})

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./demo",
            routes: {
                "/node_modules": "./node_modules",
                "/square-letter.js": "./square-letter.js"
            }
        },
        open: false
    });
    // gulp.watch("app/scss/*.scss", ['sass']);

    gulp.watch([
        "./demo/*.html",
        "./square-letter.js"
    ]).on('change', browserSync.reload);
})