# grunt-curl [![Build status](https://travis-ci.org/twolfson/grunt-curl.png?branch=master)](https://travis-ci.org/twolfson/grunt-curl)

Download files from the internet via grunt.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-curl`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-curl');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Documentation
`grunt-curl` retrieves data via [request][request] and writes it to file.

We register two grunt tasks
```js
grunt.initConfig({
  // Grab single files
  curl: {
    // Short format (dest: src)
    'location/to/download/file.js': 'http://files.com/path/to/file.js',

    // Long format
    long: {
      src: 'http://files.com/path/to/file.js',
      dest: 'location/to/download/file.js'
    },

    // Use any of request's options
    custom: {
      src: {
        url: 'http://files.com/path/to/file.js',
        method: 'POST',
        body: 'abc'
      },
      dest: 'location/to/download/file.js'
    }
  },
  // Grab multiple files
  'curl-dir': {
    // Short format (dest folder: [src1, src2])
    // These will be saved as 'location/to/save/files/file1.js'
    //    and 'location/to/save/files/file2.js'
    'location/to/save/files': [
      'http://files.com/path/to/file1.js',
      'http://generic.com/scripts/file2.js'
    ],

    // Long format
    long: {
      src: [
        'http://files.com/path/to/file1.js',
        'http://files.com/path/to/file2.js'
      ],
      dest: 'location/to/save/files'
    },

    // src files will expand to same file1.js and file2.js as long format
    braceExpansion: {
      src: ['http://files.com/path/to/{file1,file2}.js'],
      dest: 'location/to/save/files'
    },

    // Custom filepaths
    // This will save file1.js to location/to/save/files/path/to/file1.js
    //    and file2.js to location/to/save/files/scripts/file2.js
    customFilepaths: {
      src: [
        'http://files.com/path/to/file1.js',
        'http://generic.com/scripts/file2.js'
      ],
      router: function (url) {
        return url.replace('http://files.com/', '').replace('http://generic.com/', '');
      },
      dest: 'location/to/save/files'
    },

    // Use any of request's options
    custom: {
      src: [{
        url: 'http://files.com/path/to/file.js',
        method: 'POST',
        body: 'abc'
      }],
      dest: 'location/to/save/files'
    }
  }
}):
```

and a grunt helper
```js
grunt.helper('curl', url, function handleData (err, content) {
  // Handle error and use content
});
```

[request]: https://github.com/mikeal/request

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint your code using [grunt][grunt] and test via `npm test`.

## Donating
Support this project and [others by twolfson][gittip] via [gittip][].

[![Support via Gittip][gittip-badge]][gittip]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip]: https://www.gittip.com/twolfson

## License
Copyright (c) 2013 Todd Wolfson
Licensed under the MIT license.
