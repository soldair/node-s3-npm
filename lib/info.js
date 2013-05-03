var knox = require('knox');
var s3error = require('./s3error');

// returns the whole json doc for package
module.exports = function(config,s3packagename,cb){
  // bucket/module
  var parts = s3packagename.split('/')
  if(parts.length < 2) return cb(new Error('could not determine s3 bucket from '+s3packagename));

  var bucket = parts.shift();
  var module = parts.join('/');
  var calledback = false;

  var client = knox.createClient({
    key:config.key,
    secret:config.secret,
    bucket:bucket
  });
  
  client.getFile(module+'.json',function(err,res){
    if(calledback) return;

    calledback = true;
    if(err) return cb(err);

    var body = '';
    res.on('data',function(data){
      body += data.toString();
    }).on('end',function(){
      var json = false;
      if(res.statusCode === 200){
        try{
          json = JSON.parse(body);
        } catch (e){
          err = e;
        }
      } else {
        err = body;
      } 

      cb(s3error(err),json,res);
    });
  });

}
