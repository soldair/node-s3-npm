
var publish = require('./lib/publish')
var info = require('./lib/info')
var install = require('./lib/install')
var configure = require('./lib/configure')
var log = require('./lib/log');

// can put a package in s3
// can install a package from s3 

module.exports = function(config){

  //log('info','config',config);

  var cmd = config._[0];
  var cmds = {
    publish:function(config){
      publish(config,function(err,data){
        if(err) {
          log('error',err);
          process.exit(1)
        }
        log('success',data);
      }); 
    },
    info:function(config){
      info(config,config._[1],function(err,data){
        if(err) {
          log('error',err);
          process.exit(1)
        }
        log('success',data);
      });
    },
    install:function(config){

      install(config,config._[1],function(err,data){
        if(err) {
          log('error',err);
          process.exit(1)
        }
        if(data) log('success',data);
      });     
    },
    configure:function(config){
      configure(config,function(){
        if(err) {
          log('error',err);
          process.exit(1)
        }
        // 
        log("success","config done");
      });
    },
    search:function(){
      //
    }
  };

  // should support @version
  cmds.view = cmds.info;

  if(cmds[cmd]) {

    cmds[cmd](config);

  } else {
    log('error','unknown command ',cmd);
    process.exit(1);
  }

}
