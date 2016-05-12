## Information

<table>
<tr>
<td>Package</td><td>gulp-json2js</td>
</tr>
<tr>
<td>Description</td>
<td>Convert JSON object to JS file</td>
</tr>
<tr>
<td>Node Version</td>
<td>≥ 0.10</td>
</tr>
</table>

## Usage

First, install `gulp-json2js` as a development dependency:

```shell
npm install --save-dev gulp-json2js
```

Then, add it to your `gulpfile.js`:

```javascript
var json2js = require('gulp-json2js');
var rename = require("gulp-rename");
var data = require('gulp-data');

gulp.task('generateJS', function() {
  gulp.src('./data/localModel.js')
    .pipe(rename('local.js'))
    .pipe(data(function(file) {
      delete require.cache['./data/local.json'];
      return require('./data/local.json');
    }))
    .pipe(json2js())
    .pipe(gulp.dest('./data/'))
});
```
## LICENSE

(MIT License)

Copyright (c) 2013 Blaine Bublitz

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
