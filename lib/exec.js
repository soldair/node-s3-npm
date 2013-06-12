var path = require('path');
var fs = require('fs');
var npm = require('npm');

module.exports.pack = function(packagedir,cb){
  
  npm.load({'cache-lock-stale':10},function(){
    npm.commands.pack([packagedir],true,function(err,files){
      cb(err,files?files[0]:false);
    });
  });

}


