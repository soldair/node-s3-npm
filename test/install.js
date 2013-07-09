var test = require('tape');
var install = require('../lib/install');
var config = require('../config');

test('install package',function(t){
  install(config,'soldair-s3npm/s3-fixture',function(err,data){
    console.log(err,data);
    t.ok(!err,'should not have error with install');
    t.end();
  });    
});

test('install on empty dependencies key', function(t) {
  config.dir = __dirname + '/fixture';
  install(config, null, function(err, data) {
    t.ok(!err, 'should exit silently when no s3deps specified');
    t.ok(data == null, 'should not be any installed deps');
    t.end();
  });
});
