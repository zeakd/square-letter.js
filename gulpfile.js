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
                "/square-letters.js": "./square-letters.js"
            }
        },
        open: false
    });
    // gulp.watch("app/scss/*.scss", ['sass']);

    gulp.watch([
        "./square-letters.js",
        "./demo/**/*"
    ]).on('change', browserSync.reload);
})