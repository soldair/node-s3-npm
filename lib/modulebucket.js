
module.exports = function(packagename){
  var parts = packagename.split('/')
  if(parts.length < 2) throw new Error('could not determine s3 bucket from '+s3packagename));

  var bucket = parts.shift();
  var module = parts.join('/');
  return {module:module,bucket:bucket};
}
