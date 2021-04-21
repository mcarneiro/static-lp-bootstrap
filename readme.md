# Static Landing Page Bootstrap

Simple bootstrap for creating fast music related Landing Pages with social "login wall" ootb integrations and support for tracking.

## How to start

You'll need [NodeJS](https://nodejs.org/en/) 14.15.4 installed and run:

* `npm i`: to install all packages
* `npm run dev`: start browsersync server with watchers
* `npm start`: build the website in production mode

## How it's organized

This project uses `metalsmith` with pug over `metalsmith-layout` plugin.

* `src` contains all source files (pre processing)
* `src/data` contains all data files for pug (extensions used here will be used on output folter)
* `www` is the output folder, you can place all static files here
