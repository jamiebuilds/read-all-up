// @flow
'use strict';
const path = require('path');
const fs = require('fs');
const parentDirs = require('parent-dirs');
const promisify = require('util.promisify');
const readFile = promisify(fs.readFile);

/*::
type Opts = {
  cwd?: string,
  encoding?: string,
};
*/

function getFilePaths(filename, opts) {
  let startDir = path.resolve(opts.cwd || '');

  let filenames = [].concat(filename);
  let dirs = parentDirs(startDir);

  let filePaths = [];

  dirs.forEach(dir => {
    filenames.forEach(filename => {
      filePaths.push(path.join(dir, filename));
    });
  });

  return filePaths;
}

function readAllUp(filename /*: string */, opts /*: Opts | void */) {
  opts = opts || {};

  let encoding = opts.encoding || null;
  let filePaths = getFilePaths(filename, opts);
  let results = [];

  return Promise.all(filePaths.map(filePath => {
    return readFile(filePath, (encoding /*: any */)).then(fileContents => {
      return { filePath, fileContents };
    }).catch(err => {
      if (err.code !== 'ENOENT') throw err;
      return null;
    });
  })).then(results => results.filter(Boolean));
}

function readAllUpSync(filename /*: string */, opts /*: Opts | void */) {
  opts = opts || {};

  let encoding = opts.encoding || null;
  let filePaths = getFilePaths(filename, opts);
  let results = [];

  filePaths.forEach(filePath => {
    try {
      results.push({
        filePath,
        fileContents: fs.readFileSync(filePath, (encoding /*: any */))
      });
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
  });

  return results;
}

module.exports = readAllUp;
module.exports.sync = readAllUpSync;
