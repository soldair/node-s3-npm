var colors = require('colors');

module.exports = function(level){

  var args = [].slice.call(arguments);
  var title = 's3npm';

  args.shift();// remove level.

  if(level === 'error'){
    title = "[error "+title+']';
    title = title.red;
  } else if(level === 'success'){
    title = "[ok "+title+']';
    title = title.green;
  } else if(level === 'info'){
    title = "[info "+title+']';
    title = title.grey;
  } else if(level === 'warn'){
    title = "[warn "+title+']';
    title = title.yellow;    
  } 

  args.unshift(title);
  console.log.apply(console,args);

}
