#!/usr/bin/env node

var spawn = require('child_process').spawn;

function runMake() {
  var make = spawn('make', ['-j', 'pre-commit']);
  make.stdout.setEncoding('utf8');
  make.stderr.setEncoding('utf8');

  make.stdout.on('data', function (data) {
    process.stdout.write(data);
  });

  make.stdout.on('error', function (data) {
    process.stderr.write('ERROR:', data);
  });

  make.on('close', function (code) {
    if (code) {
      console.log('make pre-commit exited with code', code);
      console.log('Have you defined "pre-commit" target in the Makefile?');
      process.exit(code);
    }
  });
}

console.log('Running pre-commit hook');
runMake();

