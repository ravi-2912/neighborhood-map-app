readme Ravinder Singh Fri 10/08/2018, 16:29

# Café Map - React Neighborhood Map App

_By Ravinder Singh_

## About

This single page app uses the [Google Maps API](https://cloud.google.com/maps-platform/maps/) and the location-based
service [Foursquare API](https://developer.foursquare.com/serve) to list some popular Cafés in the Coventry, UK.

![Screenshot for Café Map, a React Neighborhood Map App](http://url/to/img.png)

### Features

-   Toggle Point of Interests
-   Search / filter list items
-   Responsive & Mobile Freindly
-   Information Window for Marrkers
-   ARIA enabled

### Technology

-   React JS
-   Promises
-   Fetch API
-   HTML 5, CSS 3
-   Service Workers
-   ES6 JavaScript

## Installation

To install you first need to download by `git clone` or download button. Afterwards you should use `npm i` or
`npm install` and then `npm start` to start the project. Then open [http://localhost:3000](http://localhost:3000).

```bash
$ npm install
$ npm start
```

### Dependencies

Following dependencies are required for the project to run

```
react
react-dom
react-scripts
react-router-dom
sort-by
prop-types
escape-string-regexp
```

## Running the App

The app can be run in either development mode or production mode.

### Developer Mode

To run the app in devevelopment mode type `npm start` in the command prompt within the project directory.

#### VS-Code Utilities

For those using [Visual Studio Code](https://code.visualstudio.com/) there are some _devDependencies_ to boost
productivity when using JSX syntax. These will help auto-formatting the JavaScript files containing JSX syntax by using
ESLint and Pretter. Install the following _devDependencies_

```
prettier
eslint-config-prettier
eslint-plugin-prettier
```

Affter this open Settings by _File_ > _Preferences_ > _Settings_ and copy `.prettierrc`, `.eslintrc` and
`.vscode\settings.json` into your projetc folder.

### Production Mode

To run the production type the following in the command prompt from the project directory

```bash
$ npm run-script build
$ serve -s build
```

Then open [http://localhost:5000](http://localhost:5000) or the relevant site as instructed in the command prompt after
executing the `serve` command.

Install `serve` if not already present using `npm i -g serve`.

## Note

### Google Maps and FourSquare API

This application uses API's from Google maps and Foursquare, and developer free plans are only limited to a certain
number of requests per day so you may experience not being able to load content. Note: The service worker is only
functional in production mode (try it on the hosted site).

### License

Free to use for anything as per MIT License.
