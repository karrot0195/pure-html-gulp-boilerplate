const { watch, src, series, dest, task } = require("gulp");
const pug = require("gulp-pug");
const browser = require("browser-sync");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const fs = require("fs");
const browerPort = process.env.BROWSER_PORT || 8080;

function clean(cb) {
  cb();
}

function pugGenerator() {
  const data = JSON.parse(fs.readFileSync("./src/data.json", "utf8"));
  const inlineCss = fs.readFileSync("./dist/main.css", "utf8");
  return src("./src/pug/*.pug")
    .pipe(
      pug({
        pretty: true,
        data: {
          ...data,
          main: {
            title: "Index Page",
            links: fs.readdirSync("dist/").filter((f) => f.match(/html/)),
          },
          inlineCss: inlineCss,
        },
      })
    )
    .pipe(dest("./dist"));
}

function scssGenerator() {
  return src("./src/scss/*.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
      })
    )
    .pipe(dest("./dist"));
}

function browserReload(cb) {
  browser.reload();
  cb();
}

function build(tasks = []) {
  return series(clean, scssGenerator, pugGenerator, ...tasks);
}

// WATCH TASK
task("watch", function () {
  browser.init({
    server: {
      baseDir: "./dist",
    },
    port: browerPort,
    open: false,
  });
  watch(["./src/**/*"], build([browserReload]));
});

// BUILD task
task("build", build());
