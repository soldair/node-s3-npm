var path = require('path');
var npm = require('npm');
var packageroot = require('packageroot');
var log = require('./log');
var server = require('./server')

module.exports = function(config,module,cb){
  
  packageroot(config.dir||process.cwd(),function(err,root){
    if(err) return cb(err);

    var package = require(path.join(root,'package.json'));
    var proxyserver;

    var s = Date.now();
    proxyserver = server(config,function(err,address){
      
      if(err) return cb(err);

      address = 'http://'+address.address+':'+address.port;

      log('info','npm proxy server running on ',address,Date.now()-s,'ms');

      s = Date.now();
      npm.load({'registry': address,'strict-ssl':false}, function (err) {

        log('info','npm loaded',Date.now()-s,'ms');

        var deps = config.dependenciesKey || package.s3dependencies|| package.s3Dependencies;

        if(module) {

          log('info','installing specific module ',module);

          deps = [module+'@latest'];

        } else if(!(deps instanceof Array)) {

          var _deps = [];
          Object.keys(deps).forEach(function(name,k){
              deps.push(name+'@'+deps[name]);
          });
          deps = _deps;

          log('info','installing package deps ',deps);
        }

        s = Date.now();
        npm.commands.install(deps, function (err, data) {

          proxyserver.end();

          log('info','install finished ',Date.now()-s,'ms');

          cb(err,data);
        });

      });

    });

  });
}

