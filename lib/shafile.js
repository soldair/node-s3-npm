var crypto = require('crypto');
var fs = require('fs');

module.exports = function(file,cb){
  var sha = crypto.createHash('sha1');
  var rs = fs.createReadStream(file);
  rs.on('data',function(data){
    sha.update(data);
  }).on('end',function(){
    cb(false,sha.digest('hex'));
  }).on('error',function(e){
    cb(e);
    cb = function(){};
  });

}
