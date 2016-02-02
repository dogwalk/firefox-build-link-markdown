#!/usr/bin/env node

/* eslint-disable no-console */

const spawn = require('cross-spawn-async');
const path = require('path');
const pify = require('pify');
const mkdirp = require('mkdirp');
const cpy = require('cpy');
const params = Object.assign(
  {},
  {
    cwd: 'dist',
    stdio: 'inherit',
    env: process.env,
  }
);
const jpmPath = path.join(process.cwd(), 'node_modules', '.bin', 'jpm');

new Promise((resolve, reject) => {
  const command = spawn(jpmPath, ['xpi'], params);
  command.on('error', (err) => {
    reject(err);
  });
  command.on('close', (code) => {
    if (code === 0) {
      resolve();
    } else {
      reject(`exit code is ${code}`);
    }
  });
}).then(() =>
  pify(mkdirp)(path.join('dist', 'pkg'))
).then(() =>
  cpy([path.join('dist', '*.xpi')], path.join('dist', 'pkg'))
).catch((error) => {
  console.error(error);
  process.exit(1);
});
