var config = require('confuse')({files:['.s3npm.json']});
var argv = require('optimist').argv;
config._ = argv._;

if(process.env.S3NPM_KEY) {
  console.log('have key');
  config.key = process.env.S3NPM_KEY;
} else {
  console.log('no key!!!');
}

if(process.env.S3NPM_SECRET) {
  console.log('secret!!');
  config.secret = process.env.S3NPM_SECRET;
} else {
  console.log('no secret!!');
}

module.exports = config;
  

