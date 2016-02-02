#!/usr/bin/env node

/* eslint-disable no-console */

const spawn = require('cross-spawn-async');
const params = Object.assign(
  {},
  {
    cwd: 'dist',
    stdio: 'inherit',
    env: Object.assign(
      {},
      process.env,
      { NODE_ENV: 'production' }
    ),
  }
);
const install = spawn('npm', ['install'], params);
install.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
