'use strict';

/**************/
/*  REQUIRES  */
/**************/
import gulp from 'gulp';

// File I/O
import filter from 'gulp-filter';
import ts from 'gulp-typescript';

/****************/
/*  FILE PATHS  */
/****************/
const paths = {
  src: ['src/**/*.ts'],

  test: ['test/**/*.ts', '!test/integration/postcheck/typescript/*.ts'],

  build: 'lib/',
};

// Create a separate project for buildProject that overrides the rootDir.
// This ensures that the generated production files are in their own root
// rather than including both src and test in the lib dir. Declaration
// is used by TypeScript to determine if auto-generated typings should be
// emitted.
const buildProject = ts.createProject('tsconfig.json', { rootDir: 'src', declarationMap: true });

// Include dom libraries during test compilation since we use some web SDK
// libraries in our tests.
const buildTest = ts.createProject('tsconfig.json', { lib: ['es2018'] });

/***********/
/*  TASKS  */
/***********/

gulp.task('cleanup', async () => {
  const del = await import('del');
  return del.deleteSync([paths.build]);
});

// Task used to compile the TypeScript project. If automatic typings
// are set to be generated (determined by TYPE_GENERATION_MODE), declarations
// for files terminating in -internal.d.ts are removed because we do not
// want to expose internally used types to developers. As auto-generated
// typings are a work-in-progress, we remove the *.d.ts files for modules
// which we do not intend to auto-generate typings for yet.
gulp.task('compile', () => {
  let workflow = gulp
    .src(paths.src)
    // Compile Typescript into .js and .d.ts files
    .pipe(buildProject());

  const configuration = ['lib/**/*.js', 'lib/**/*.d.ts'];

  workflow = workflow.pipe(filter(configuration)) as never;

  // Write to build directory
  return workflow.pipe(gulp.dest(paths.build));
});

/**
 * Task only used to capture typescript compilation errors in the test suite.
 * Output is discarded.
 */
gulp.task('compile_test', () => {
  return (
    gulp
      .src(paths.test)
      // Compile Typescript into .js and .d.ts files
      .pipe(buildTest())
  );
});

gulp.task('copyTypings', () => {
  return (
    gulp
      .src(['src/index.d.ts'])
      // Add header
      .pipe(gulp.dest(paths.build))
  );
});

// Task to copy package.json, LICENSE, README
//gulp.task('copyReleaseFiles', () => {
//  return (
//    gulp
//      .src(['package.json', 'LICENSE', 'README.md'])
//      // Add header
//      .pipe(gulp.dest(paths.build))
//  );
//});

gulp.task('compile_all', gulp.series('compile', /*'copyTypings',*/ 'compile_test'));

// Regenerates js every time a source file changes
gulp.task('watch', () => {
  gulp.watch(paths.src.concat(paths.test), { ignoreInitial: false }, gulp.series('compile_all'));
});

// Build task
gulp.task('build', gulp.series('cleanup', 'compile' /* 'copyTypings', 'copyReleaseFiles' */));

// Default task
gulp.task('default', gulp.series('build'));
