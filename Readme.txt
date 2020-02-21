This is a README file for PDF_Editorial project.
Author: Ani Hovhannisyan
Release: November 2018

CONTENT
1. RUN
2. INSTALLATION
3. DEPENDENCIES
4. TEST
5. PACKAGE RELEASE

-------------------------------------------------------------------------------
1. RUN
  $ npm start

2. INSTALLATION
  $ npm install


3. DEPENDENCIES
  After the "npm install" there could be "hummus" module error, need to type:
$ ./node_modules/.bin/electron-rebuild 
After you should see ✔ Rebuild Complete
and then error will be fixed.

4. TEST
  TODO: make test cases for PDF cut process.
  $ npm test

5. PACKAGE RELEASE
  $ npm package-linux
