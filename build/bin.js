#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const bundle = require('./bundle');
const webBundle = require('./web-bundle');

if (process.argv.filter(t => t === 'web').length) {
    const basePath = process.cwd();
    const pkg = require(path.join(basePath, './package'));
    const options = pkg.hypertype.web;
    console.log(options);
    //
    // const html = process.argv.filter(t => /\.html$/.test(t))[0];
    // const htmlAbsolute = path.join(basePath, html);
    // console.log('hypertype is building');
    // console.info(htmlAbsolute);
    // const htmlContent = fs.readFileSync(html,'utf8');
    // const index = htmlContent.match(/<script src="(.*)"\/?>/)[1];
    // const relative = path.dirname(html);
    // const indexAbsolute = path.join(relative, index);
    webBundle(options);
}else{
    bundle();
}