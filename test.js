'use strict';
const path = require('path');
const test = require('ava');
const readAllUp = require('./');

let root = path.join(__dirname, 'fixture');

test('readAllUp', async t => {
  let cwd = path.join(root);
  let files = await readAllUp('foo.txt', { cwd, encoding: 'utf8' });

  t.deepEqual(files, [
    {
      filePath: path.join(root, '/foo.txt'),
      fileContents: 'in: /foo.txt\n',
    },
  ]);
});

test('readAllUp', async t => {
  let cwd = path.join(root, 'bar', 'baz', 'bat');
  let files = await readAllUp('foo.txt', { cwd, encoding: 'utf8' });

  t.deepEqual(files, [
    {
      filePath: path.join(root, '/bar/baz/bat/foo.txt'),
      fileContents: 'in: /bar/baz/bat/foo.txt\n',
    },
    {
      filePath: path.join(root, '/bar/foo.txt'),
      fileContents: 'in: /bar/foo.txt\n',
    },
    {
      filePath: path.join(root, '/foo.txt'),
      fileContents: 'in: /foo.txt\n',
    },
  ]);
});

test('readAllUp', async t => {
  let cwd = path.join(root, 'bar', 'baz', 'bat');
  let files = await readAllUp('foo.txt', { cwd });

  t.deepEqual(files, [
    {
      filePath: path.join(root, '/bar/baz/bat/foo.txt'),
      fileContents: Buffer.from('in: /bar/baz/bat/foo.txt\n'),
    },
    {
      filePath: path.join(root, '/bar/foo.txt'),
      fileContents: Buffer.from('in: /bar/foo.txt\n'),
    },
    {
      filePath: path.join(root, '/foo.txt'),
      fileContents: Buffer.from('in: /foo.txt\n'),
    },
  ]);
});

test('readAllUp', async t => {
  let cwd = path.join(root, 'bar', 'baz', 'bat');
  let files = await readAllUp(['foo.txt', 'other.txt'], { cwd, encoding: 'utf8' });

  t.deepEqual(files, [
    {
      filePath: path.join(root, '/bar/baz/bat/foo.txt'),
      fileContents: 'in: /bar/baz/bat/foo.txt\n',
    },
    {
      filePath: path.join(root, '/bar/foo.txt'),
      fileContents: 'in: /bar/foo.txt\n',
    },
    {
      filePath: path.join(root, '/bar/other.txt'),
      fileContents: 'in: /bar/other.txt\n'
    },
    {
      filePath: path.join(root, '/foo.txt'),
      fileContents: 'in: /foo.txt\n',
    },
  ]);
});
