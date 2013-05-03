//in order to publish
//  - must generate proper npm json for the package.
//  - download existing json if any and compare to make sure there is a version change
//  - must npm pack tar
//  - must copy tar named after version to s3 bucket.
//  - must copy json to file and send to to s3 bucket named packagenamehere.json

var path = require('path');
var packageroot = require('packageroot');
var packagenpmjson = require('packagenpmjson');
var knox = require('knox');
var fs = require('fs');

var info = require('./info');// request existing json for package.
var log = require('./log');
var exec = require('./exec');
var jsonmerge = require('./jsonmerge');
var s3error = require('./s3error');

module.exports = function(config,cb){
  
  var cwd = config.dir||process.cwd();

  packageroot(cwd,function(err,root){

    // get the target package.json
    var packagejson = require(path.join(cwd,'package.json'));

    if(err) return cb(err);

    log('info','preparing publish ',packagejson.name,' in ',root,' to s3');
    var s = Date.now();
    exec.pack(root,function(err,tarpath,stat){

      log('info','packed tar to publish - ',Date.now()-s,'ms');
      //
      // generate npm style json.
      //
      //[npm registry url],[path to package root],[path to tar produced by npm pack]
      s = Date.now();
      packagenpmjson(config.repo||'http://localhost:8087',root,tarpath,function(err,data){
        log('info','generated package json to publish ',Date.now()-s,'ms');
        if(err) return cb(err);

        //
        // get the json of the version already published.
        //
        s = Date.now();
        info(config,packagejson.s3bucket+'/'+packagejson.name,function(err,json){

          log('info','got package information friom s3 ',Date.now()-s,'ms');
          if(err && err.code !== 'E_NOENT') return cb(err);
          
          if(json) {
            
            // is this version of this module already published?
            if(json.versions[packagejson.version]){
              if(config.force) {
                log('warn','this version is already published but you are forcing me to overwrite it!');
              } else {
                var e = new Error('verison already published. incrememnt version or --force to force overwrite.');
                e.code = 'E_DUP';
                return cb(e);
              }
            }

            //
            // merge json
            //
            json = jsonmerge(json,data);
          } else {
            json = data;
          }

          //
          // put in s3
          //
          var client = knox.createClient({
            key:config.key,
            secret:config.secret,
            bucket:packagejson.s3bucket
          });

          s = Date.now();

          var c = 2
          ,errors = []
          ,done = function(err,data){
            if(err) errors.push(err);
            c--;
            if(!c) {
              //
              // im uploaded to s3!
              //
              fs.unlink(tarpath,function(err){
                log('info','published package information and tar to s3',Date.now()-s,'ms');

                if(err) log('warn','couldnt delete packed tar',err);
                cb(errors.length?errors:false,json,'/'+path.basename(tarpath));
              });
            }
          }; 

          jsonstr = JSON.stringify(json);
          //
          // put json
          //
          var req = client.put(packagejson.name+'.json',{
              'Content-Length': jsonstr.length
            , 'Content-Type': 'application/json'
          });

          req.on('response',function(res){

            var body = '';
            res.on('data',function(data){
              body += data.toString();
            }).on('end',function(){
              var json = false;
              if(res.statusCode === 200){
                err = false; 
              } else {
                err = body;
              } 

              done(s3error(err),body,res);
            });

          });
          req.end(jsonstr);

          //
          // put tar
          //
          client.putFile(tarpath,'/'+path.basename(tarpath),function(err,res){
            // fu
            var body = '';
            res.on('data',function(data){
              body += data.toString();
            }).on('end',function(){
              var json = false;
              if(res.statusCode === 200){
                err = false; 
              } else {
                err = body;
              } 

              done(s3error(err),body,res);
            });
          });
          
        });     
      });
    });

  });

}
