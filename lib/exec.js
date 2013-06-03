var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');
//var npm = require('npm');

module.exports.pack = function(packagedir,cb){
  /*
  npm.load({},function(){
    npm.commands.pack([root],true,function(err,files){
      console.log('PACK!!!! ',files);
      cb(err,files?files[0]:false);
    });
  });
  */
  
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


