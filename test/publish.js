var test = require('tap').test;
var publish = require('../lib/publish');
var config = require('../config');

test("test info",function(t){
  publish(config,function(err,data){
    var versions = Object.keys(data.versions);
    t.ok(!err,'should not have error publishing');
    t.ok(data.versions[versions[0]].dist.sha,'must have sha in dist');
    t.end();
  });
});
