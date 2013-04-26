//in order to publish
//  - must generate proper npm json for the package.
//  - download existing json if any and compare to make sure there is a version change
//  - must npm pack tar
//  - must copy tar named after version to s3 bucket.
//  - must copy json to file and send to to s3 bucket named packagenamehere.json

var info = require('./info');// request existing json for package.
var path = require('path');
var packageroot = require('packageroot');
var log = require('./log');
var exec = require('./exec');
var json = require('./json');

module.exports = function(config,cb){
  
  var cwd = process.cwd();
  packageroot(cwd,function(err,root){

    // get the target package.json
    var packagejson = require(path.join(cwd,'package.json'));

    if(err) return cb(err);

    log('info','preparing publish ',packagejson.name,' in ',root,' to s3');

    exec.pack(root,function(err,tarpath,stat){
      // generate json.
      json(config,root,tarpath,packagejson,function(err,data){
        if(err) return cb(err);
        console.log('NOW PUT THIS IN S3 ',data);


        info(config,packagejson.s3bucket+'/'+packagejson.name,function(err,json){
          
          if(err && err.code !== 'E_NOENT') return cb(err);
          
          // is this version of this module already published?
          if(json && json.versions[packagejson.version]){
            var e = new Error('verison already published. incrememnt version or unpublish first.');
            e.code = 'E_DUP';
            return cb(e)
          }

          cb(false,data,json);
        });     
      });

    });
  });

}
