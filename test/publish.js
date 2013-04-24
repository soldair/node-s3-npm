var test = require('tap').test;
var publish = require('../lib/publish');
var config = require('../config');

test("test info",function(t){
  t.plan(1);
  publish(config,function(err,data){
    cosole.log('PUBLISH CALLED BACK');
    console.log(err,data);

    t.ok(!err,'should not have error publishing');
  });
});
