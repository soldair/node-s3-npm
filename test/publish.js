var test = require('tap').test;
var publish = require('../lib/publish');
var config = require('../config');

test("test publish",function(t){
  config.force = true;
  publish(config,function(err,data){
    console.log(data);
    var versions = Object.keys(data.versions);


    console.log(data.versions[versions[0]].dist);

    t.ok(!err,'should not have error publishing');
    t.ok(data.versions[versions[0]].dist.shasum,'must have sha in dist');
    t.end();
  });
});
