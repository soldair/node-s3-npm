var config = require('confuse')({dir:process.cwd(),files:['.s3npm.json']});
var argv = require('optimist').argv;
config._ = argv._;


if(process.env.S3NPM_KEY) {
  config.key = process.env.S3NPM_KEY;
}

if(process.env.S3NPM_SECRET) {
  config.secret = process.env.S3NPM_SECRET;
}

module.exports = config;
  

