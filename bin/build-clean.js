#!/usr/bin/env node

/* eslint-disable no-console */

const rimraf = require('rimraf');
const pify = require('pify');

pify(rimraf)('dist').catch((error) => {
  console.error(error);
  process.exit(1);
});
