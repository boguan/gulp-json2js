'use strict';

var extend = require('util')._extend;
var through = require('through2');
var PluginError = require('gulp-util').PluginError;

function generate(template, sourceObject) {

  return template.replace(/{{\s*([^\{\}]+)\s*}}/g, function(match, p1) {

    var tempObj = null;
    var myArray = [];
    var matchedValue = null;
    var myRe = /[^'"\.\[\]]+/g;

    matchedValue = p1.match(/^[^\.|\[]+/);

    if(matchedValue && matchedValue.length) {

      if(p1 === matchedValue[0]) { // 只有字符串的情况
        tempObj = sourceObject[p1];
      } else {

        tempObj = sourceObject;

        console.log(p1);

        while ((myArray = myRe.exec(p1)) !== null) {
          tempObj = tempObj[myArray[0]];
        }

      }

      if (tempObj instanceof Object) {
        return JSON.stringify(tempObj);
      } else {
        if(typeof tempObj == 'string' && tempObj !== 'true' && tempObj !== 'false') {
          return '"' + tempObj + '"';
        } else {
          return tempObj;
        }
      }
    }

    return '';
  });
}

module.exports = function(options) {

  var opts = extend({}, options);

  return through.obj(function (file, enc, cb) {

    if(file.data){
      opts.data = file.data;
    }

    if(file.isStream()){
      return cb(new PluginError('gulp-json-to-js', 'Streaming not supported'));
    }

    if(file.isBuffer()){
      try {
      var compiled;
      var contents = String(file.contents);
      compiled = generate(contents, opts.data);
      file.contents = new Buffer(compiled);
      } catch(e) {
      return cb(new PluginError('gulp-json-to-js', e));
      }
    }
    cb(null, file);

  });
};
