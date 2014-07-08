# grunt-curl [![Build status](https://travis-ci.org/twolfson/grunt-curl.png?branch=master)](https://travis-ci.org/twolfson/grunt-curl)

Download files from the internet via [grunt][].

This was created for dependency management via [`grunt-curl`][] and [`grunt-zip`][] as a low-tech alternative to `bower` and similar solutions.

http://twolfson.com/2014-01-19-low-tech-dependency-management-via-grunt-tasks

[grunt]: http://gruntjs.com/
[`grunt-curl`]: https://github.com/twolfson/grunt-curl
[`grunt-zip`]: https://github.com/twolfson/grunt-zip

## Getting Started
`grunt-curl` can be installed via npm: `npm install grunt-curl`

Then, add and configure the it in your grunt file:

```js
module.exports = function (grunt) {
  // Configure `curl` with URLs
  // If you would like to download multiple files
  // to the same directory, there is `curl-dir`
  grunt.initConfig({
    curl: {
      'location/to/download/github.html': 'http://github.com/',
    }
  });

  // Load in `grunt-curl`
  grunt.loadNpmTasks('grunt-curl');
};
```

Now, we can run our task:

```bash
$ grunt curl
Running "curl:location/to/download/github.html" (curl) task
File "location/to/download/github.html" created.

Done, without errors.
```

## Documentation
`grunt-curl` creates 2 `grunt` tasks for you to use/configure, `curl` and `curl-dir`. `curl` is designed for downloading single files at a time. `curl-dir` is designed for downloading multiple files to a common directory.

Both tasks support accepting [`request`] parameters as a `src` file. [Here is an example creating a `POST` request][post-example].

[`request`]: https://github.com/mikeal/request
[post-example]: #using-request-options

### `curl`
We support 2 different formats for configuring `curl`.

#### Short format
The short format relies on [`grunt's` support of `{dest: src}`][grunt-short-format]

[grunt-short-format]: http://gruntjs.com/configuring-tasks#older-formats

```js
curl: {
  'location/to/download/file.js': 'http://files.com/path/to/file.js'
}
```

This format is suggested only if you don't need to run `curl` tasks separately

```js
grunt curl
```

If you want to run this task standalone, it must be executed via:

```bash
grunt curl:dest
# grunt curl:location/to/download/file.js
```

#### Long format
```js
curl: {
  'task-name': {
    src: 'http://files.com/path/to/file.js',
    dest: 'location/to/download/file.js'
  }
}
```

This can be run standalone via

```bash
grunt curl:task-name
```

#### Using request options
This is an example of the long format leveraging [`request`][] parameters for making a `POST` request.

```js
curl: {
  'task-name': {
    src: {
      url: 'http://files.com/path/to/file.js',
      method: 'POST',
      body: 'abc'
    },
    dest: 'location/to/download/file.js'
  }
}
```

### `curl-dir`
`curl-dir` supports 2 configuration formats.

#### Short format
As with `curl`, we leverage `grunt's {dest: src}` format for our short format.

```js
'curl-dir': {
  // These will be saved as:
  // 'location/to/save/files/file1.js' and
  // 'location/to/save/files/file2.js'
  'location/to/save/files': [
    'http://files.com/path/to/file1.js',
    'http://generic.com/scripts/file2.js'
  ]
}
```

As with before, this can be executed via `grunt curl-dir` but will execute other tasks at the same level. To run this task standalone, it must be run via:

```bash
grunt curl-dir:location/to/save/files
```

#### Long format
```js
'curl-dir': {
  'task-name': {
    src: [
      'http://files.com/path/to/file1.js',
      'http://files.com/path/to/file2.js'
    ],
    dest: 'location/to/save/files'
  }
}
```

This task can be executed from the command line via

```bash
grunt curl-dir:task-name
```

#### Brace expansion
`curl-dir` supports brace expansion for `src` in both formats.

```js
'curl-dir': {
  'brace-expansion': {
    src: ['http://files.com/path/to/{file1,file2}.js'],
    // Expands to: [
    //  'http://files.com/path/to/file1.js',
    //  'http://files.com/path/to/file2.js'
    // ]
    dest: 'location/to/save/files'
  }
}
```

#### Filepath mapping
URLs can be mapped to custom filepaths via the `router` option in the long format.

```js
'curl-dir': {
  'custom-filepaths': {
    src: [
      'http://files.com/path/to/file1.js',
      'http://generic.com/scripts/file2.js'
    ],
    router: function (url) {
      // Save `file1.js` to 'location/to/save/files/hello/world/file1.js'
      // and `file2.js` to 'location/to/save/files/goodbye/moon/file2.js'
      var filepath = url.replace('http://files.com/path/to', 'hello/world');
      return url.replace('http://generic.com/scripts', 'goodbye/moon');
    },
    dest: 'location/to/save/files'
  }
}
```

#### Using request options
As demonstrated in `curl`, we can use [`request`][] options to leverage special HTTP actions (e.g. make a `POST` request).

```js
'curl-dir': {
  custom: {
    src: [{
      url: 'http://files.com/path/to/file.js',
      method: 'POST',
      body: 'abc'
    }],
    dest: 'location/to/save/files'
  }
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint your code using [grunt][grunt] and test via `npm test`.

## Donating
Support this project and [others by twolfson][gittip] via [gittip][].

[![Support via Gittip][gittip-badge]][gittip]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip]: https://www.gittip.com/twolfson

## Unlicense
As of Jun 14 2014, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE

Prior to Jun 14 2014, this repository and its contents were licensed under the [MIT license][].

[MIT license]: https://github.com/twolfson/grunt-curl/blob/1.5.1/LICENSE-MIT
