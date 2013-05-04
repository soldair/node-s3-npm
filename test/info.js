var test = require('tape');
var info = require('../lib/info');
var config = require('../config');

test("test info",function(t){
  info(config,'soldair-s3npm/package',function(err,data){
    t.equals(err.code,'E_NOENT','package should not exist');
    t.end();
  });
});
