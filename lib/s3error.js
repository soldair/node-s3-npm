
module.exports = function(xml){
  if(!xml) return false;

  xml +='';
  var err = new Error();
  err.xml= xml;
  err.code = 'E_ERROR';
  if(xml.indexOf('<Code>InvalidAccessKeyId</Code>') > -1) err.code = 'E_KEY_ERROR';
  else if(xml.indexOf('<Code>NoSuchKey</Code>') > -1) err.code = 'E_NOENT';
  
  return err;
}



