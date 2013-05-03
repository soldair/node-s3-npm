
module.exports = function(packagename){
  var parts = packagename.split('/')
  if(parts.length < 2) return false; 

  var bucket = parts.shift();
  var module = parts.join('/');
  return {module:module,bucket:bucket};
}
