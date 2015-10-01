var gulp = require("gulp");

var concat = require("gulp-concat");
var jshint = require("gulp-jshint");
var rename = require("gulp-rename");
var rimraf = require("gulp-rimraf");
var uglify = require("gulp-uglify");

gulp.task("prepare-scripts", function() {
  //gulp.src("./app/scripts.min.js")
  gulp.src("./app/scripts.js")
    .pipe(rimraf());
});

gulp.task("scripts", function() {
  gulp.src("./app/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    //.pipe(concat("scripts.min.js"))
    //.pipe(uglify())
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("./app/"));
});