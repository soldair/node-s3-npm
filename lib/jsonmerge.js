var semver = require('semver');


module.exports = function(oldjson,newjson){
  
  var newVersion = newjson['dist-tags'].latest;
  var oldVersion = oldjson['dist-tags'].latest;
  var json = oldjson;

  if(semver.gte(newVersion,oldVersion)){
    json = newjson;
    _ext(json.versions,oldjson.versions);
    _ext(json.times,oldjson.times);
  } else {
    _ext(json.versions,newjson.versions);
    _ext(json.times,newjson.times);   
  }

  return json;
}

function _ext(o1,o2){
  o1 = o1||{};
  Object.keys(o2).forEach(function(k){
    o1[k] = o2[k]
  });
  return o1;
}
