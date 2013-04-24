var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');


module.exports.pack = function(packagedir,cb){
  exec('cd "'+packagedir+'"; npm pack',function(err,stdout,stderr){

      if(err) {
        return cb(err,undefined);
      }

      var tarpath = path.join(packagedir,stdout.toString().trim());

      fs.stat(tarpath,function(err,stat){
        if(err) return cb(err,undefined);
        return cb(undefined,tarpath,stat);
      });
  });
}


