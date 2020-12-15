#!/bin/bash
npm install
export PUBLIC_URL=./
npm run-script build

#setup cordova build
rm -R cordova/www/
mkdir cordova/www/
cp -R build/* cordova/www/