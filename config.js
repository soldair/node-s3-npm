var config = require('confuse')({files:['.s3npm.json']});
var argv = require('optimist').argv;
config._ = argv._;

if(process.env.S3NPM_KEY) {
  config.key = process.env.S3NPM_KEY;
}
if(process.env.S3NPM_SECRET) {
  console.log('')
  config.secret = process.env.S3NPM_SECRET;
} else {

}

module.exports = config;
  

