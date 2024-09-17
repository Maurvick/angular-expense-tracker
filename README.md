# AngularExpenseTracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.

# Live Demo

https://maurvick.github.io/angular-expense-tracker/

# Note

1. A folder name like `angular-expense-tracker` will be ignored by the
   by the path system when trying to build a project that
   will not be able to load the necessary scripts.

2. Configure the `baseHref` and `outputPath` properties in the `angular.json`
   file to make sure that the path to the location of all scripts from index.html is correct. For example : `“outputPath": “dist”, ‘baseHref’: “/dist/browser/”,`

3. Some code cannot be transcribed by polyfills because it is incorrect. For example:
   `ERROR Syntax error: JSON.parse: unexpected end of data on line 1 of column 1 of Angular 48 getItem JSON data ... <anonymous> main-XFBMJ64V.js:7:29593`. The problem here was that getItem was trying to return an invalid value, so fixing this error solved the problem.

4. Add separate `baseHref` for deploy. If your url address to web page is `https://maurvick.github.io/   angular-expense-tracker/`, use `/angular-expense-tracker/` as your `baseHref`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
