# generator-version-file
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> A Yeoman Generator for keeping a version file up to date

## Overview

This generator is meant to be used with projects of any language to keep an internal version number in the code up to date with the actual package version. This chore of the release process can be easily added to a pipeline using this tool.

It was concieved especially to be used with projects of any language that use [commitizen](https://commitizen.github.io/cz-cli/) and [stardard-version](https://github.com/conventional-changelog/standard-version) for release and changelog generation.

### Currently Supported Languages
Each file and template is built into the generator ([additional languages welcome!](https://github.com/flyinbutrs/generator-version-file/pulls))

* Javascript
* Ruby
* Python

## Usage
### `standard-version`

Ideally, this generator should be used with [`standard-version`](https://github.com/conventional-changelog/standard-version) as part of a release process to keep the version in the package in sync with the version in your package.json. You can direct that to happen in one of the two files to configure `standard-version`. Both of these options presuppose that you have installed `standard-version` already.

:warning: *NOTE*: This you must run `yo version-file` once manually to initialize the `.yo-rc` file before using this as part of your release process. :warning:

#### .versionrc

```json
{
  "scripts": {
    "postbump": "yo version-file --force --git"
  }
}
```

#### package.json

```json
{
  "standard-version": {
    "scripts": {
      "postbump": "yo version-file --force --git"
    }
  }
}
```

### Global (not recommended)

First, install [Yeoman](http://yeoman.io) and generator-version-file using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-version-file
```

Then generate your version file:

```bash
yo version-file
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Dan Rosenbloom](https://github.com/flyinbutrs/)


[npm-image]: https://badge.fury.io/js/generator-version-file.svg
[npm-url]: https://npmjs.org/package/generator-version-file
[travis-image]: https://travis-ci.org/flyinbutrs/generator-version-file.svg?branch=master
[travis-url]: https://travis-ci.org/flyinbutrs/generator-version-file
[daviddm-image]: https://david-dm.org/flyinbutrs/generator-version-file.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/flyinbutrs/generator-version-file
[coveralls-image]: https://coveralls.io/repos/flyinbutrs/generator-version-file/badge.svg
[coveralls-url]: https://coveralls.io/r/flyinbutrs/generator-version-file
