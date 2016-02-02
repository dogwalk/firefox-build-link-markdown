#!/usr/bin/env node

/* eslint-disable no-console */
// Add GITHUB_TOKEN="....." to environment variable
// see: https://github.com/tcnksm/ghr

const spawn = require('cross-spawn-async');
const yargs = require('yargs');
const path = require('path');
const assert = require('assert');

const params = Object.assign(
  {},
  {
    cwd: 'dist',
    stdio: 'inherit',
    env: process.env,
  }
);
const ghrOptions = {
  username: process.env.CIRCLE_PROJECT_USERNAME,
  repository: process.env.CIRCLE_PROJECT_REPONAME,
  tag: process.env.CIRCLE_TAG,
  ghrPath: path.join(process.cwd(), 'bin', 'linux_amd64', 'ghr'),
  targetPath: path.join(process.cwd(), 'dist', 'pkg'),
};
const argv = yargs.default(ghrOptions).argv;
assert(argv.tag !== undefined && argv.tag !== '');
assert(argv.username !== undefined && argv.username !== '');
assert(argv.repository !== undefined && argv.repository !== '');

const ghr = spawn(
  argv.ghrPath,
  [
    '-u',
    argv.username,
    '-r',
    argv.repository,
    argv.tag,
    argv.targetPath,
  ],
  params
);
ghr.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
