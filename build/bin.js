#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const bundle = require('./bundle');
const webBundle = require('./web-bundle');
const serverBundle = require('./server-bundle');

if (process.argv.filter(t => t === 'web').length) {
    const basePath = process.cwd();
    const pkg = require(path.join(basePath, './package'));
    const options = pkg.hypertype.web;
    webBundle(options);
} else if (process.argv.filter(t => t === 'server').length) {
    const basePath = process.cwd();
    const pkg = require(path.join(basePath, './package'));
    const options = pkg.hypertype.server;
    serverBundle(options);
} else {
    bundle();
}