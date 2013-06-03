var http = require('http');
var request = require('request');
var knox = require('knox');
var log = require('./log');
var info = require('./info');
var modulebucket = require('./modulebucket');
var semver = require('semver');

module.exports = function(config,cb){
  var server;
  var address;
  
  server = http.createServer(function(req,res){

    log('info',' server request ',req.url);

    if(req.url.indexOf('.tgz') == -1){

      var module = req.url.replace('/','');
      var data = modulebucket(module);

      if(!data) {
        if(config.defaultBucket){
          log('info','using default bucket ',config.defaultBucket,'for ',module);
          data = {bucket:config.defaultBucket,module:module};
        } else {
          log('warn','no s3 bucket info found for ',module,' will attempt the public registry');
        }
      }

      var doPublic = function() {
        var registry = config.publicRegistry||'https://registry.npmjs.org/';
        log('info','redirecting to public registry ',registry,' for ',module);
        
        // proxy to npm.
        req.pipe(request(registry+module,{strictSSL:false})).pipe(res);
        /*
        request(registry+module,{strictSSL:false},function(err,response,body){
          log('info',' proxy response for ',module,response.statusCode);
          console.log(response.headers);
          console.log(body.toString());

          res.writeHead(response.statusCode,response.headers);
          res.end(body);
        });
        */
      };

      if(data){
        log('info','fetching info from s3 for',data.module);
        var s = Date.now();

        // support modulename/version
        if(data.module.indexOf('/') > -1) {
          var parts = data.module.split('/');
          if(semver.valid(parts[parts.length-1])){
            // explicit versioned url. for now deliver default json.
            parts.pop();
            data.module = parts.join('/');
          }
        }
        
        info(config,data.bucket+'/'+data.module,function(err,json){

          if(err) log('warn','error getting ',module,' data from s3',Date.now()-s,'ms');
          else log('info','got info for ',module,' from s3 ',Date.now()-s,'ms');

          if(err) {
            doPublic();
          } else {
            json = JSON.stringify(json).replace(/\{REPO ADDRESS\}/g,'http://'+address.address+':'+address.port+'/'+data.bucket);
            res.end(json);
          }
        });

      } else {
        doPublic();
      }

    } else {
      var parts = req.url.split('/');
      var bucket = parts[1];
      var tar = parts.pop();
      log('info','fetching tar ',tar,' in ',bucket,' from s3');
      
      // create client. get fili\
      var client = knox.createClient({
        key:config.key,
        secret:config.secret,
        bucket:bucket
      });

      client.get('/'+tar).on('response',function(s3res){
        log('info','response from s3 ',s3res.statusCode);
        s3res.pipe(res);
      }).end();
    }
  });

  server.listen(0,'127.0.0.1',function(){
    cb(false,address = server.address());
  });

  return server;
}
