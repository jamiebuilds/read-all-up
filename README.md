# read-all-up

> Read all matching files or directories by walking up parent directories

## Install

```sh
yarn add read-all-up
```

## Example

```js
const readAllUp = require('read-all-up');

readAllUp('package.json', files => {
  console.log(files);
  // [{
  //   filePath: '/nested/current-dir/package.json',
  //   fileContents: Buffer | string,
  // }, {
  //   filePath: '/nested/package.json',
  //   fileContents: Buffer | string,
  // }, {
  //   filePath: '/package.json',
  //   fileContents: Buffer | string,
  // }]
});
```

## API

### `readAllUp(filename | filename[], [options])`

Returns a `Promise` for the files.

### `readAllUp.sync(filename | filename[], [options])`

Returns files.

#### `filename`

Type: `string`

Filename of the file to find.

#### `options`

##### `cwd`

Type: `string`
Default: `process.cwd()`

Directory to start from.

##### `encoding`

Type: `string`

Encoding to read the files as.
