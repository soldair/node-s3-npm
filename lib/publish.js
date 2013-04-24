//in order to publish
//  - must generate proper npm json for the package.
//  - download existing json if any and compare to make sure there is a version change
//  - must npm pack tar
//  - must copy tar named after version to s3 bucket.
//  - must copy json to file and send to to s3 bucket named packagenamehere.json

var path = require('path');
var packageroot = require('packageroot');
var log = require('./log');
var exec = require('./exec');
var json = require('./json');

module.exports = function(config,cb){
  
  var cwd = process.cwd();
  packageroot(cwd,function(err,dir){
    // get the target package.json
    var packagejson = require(path.join(cwd,'package.json'));

    if(err) return cb(err);

    log('info','preparing publish ',packagejson.name,' in ',dir,' to s3');

    exec.pack(dir,function(err,tarpath,stat){
      // generate json.
      json(config,root,tarpath,packagejson,function(err,data){
        if(err) return cb(err);

        console.log(data);

      });
      
    });
  });

}
