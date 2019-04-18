#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const bundle = require('./bundle');
const webBundle = require('./web-bundle');
const nodeBundle = require('./node-bundle');
const workerBundle = require('./worker-bundle');
const serverBundle = require('./server-bundle');
const testBundle = require('./test');

if (process.argv.filter(t => t === 'web').length) {
    const basePath = process.cwd();
    const pkg = require(path.join(basePath, './package'));
    const options = pkg.hypertype.web;
    webBundle(options);
} else if (process.argv.filter(t => t === 'worker').length) {
    const basePath = process.cwd();
    const pkg = require(path.join(basePath, './package'));
    const options = pkg.hypertype.worker;
    workerBundle(options);
} else if (process.argv.filter(t => t === 'server').length) {
    const basePath = process.cwd();
    const pkg = require(path.join(basePath, './package'));
    const options = pkg.hypertype.server;
    serverBundle(options);
} else if (process.argv.filter(t => t === 'test').length) {
    const basePath = process.cwd();
    const pkg = require(path.join(basePath, './package'));
    const options = pkg.hypertype.test;
    testBundle(options);
} else if (process.argv.filter(t => t === 'node').length) {
    const basePath = process.cwd();
    const pkg = require(path.join(basePath, './package'));
    const options = pkg.hypertype.node;
    nodeBundle(options);
}else {
    const basePath = process.cwd();
    const pkg = require(path.join(basePath, './package'));
    const options = pkg.hypertype.lib;
    bundle(options);
}
