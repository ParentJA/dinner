var gulp = require("gulp");
var jshint = require("gulp-jshint");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");

gulp.task("scripts", function() {
  gulp.src("./app/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("./app/"));
});