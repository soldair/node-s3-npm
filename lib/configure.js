var readline = require('readline');
var creds = require('aws-credentials');
var log = require('./log');

module.exports = function(config,cb){

  var editable = {
    defaultBucket:config.defaultBucket,
    key:config.key,
    secret:config.secret,
    dependenciesKey:config.dependenciesKey
  };

  var haveCurrent = false;
  if(editable.defaultBucket || editable.key || editable.secret || editable.dependenciesKey){
    log("info",'current config '+JSON.stringify(config,false,true));
  }

  creds(function(err,creds){
    
    // get the key
    // get the secret
    // would you like to select a default bucket for this project? You dont have to, but if you dont your package names will have to be prefixed like bucketname/packagename.
      // list buckets
        // *can list bucket.
          // compleater^
          // please enter the name of a new or existing bucket you would like to use for your node modules. you may tab to complete.
            // check bucket exists
              // make bucket
              // *error 
                //could not create bucket. would you like to pick another? just hit enter to keep the new name,
        // *cannot list buckets
          // Oh no! these credentials cannot list buckets. please confirm they are correct and if using IAM that the policy is configured correctly.
          // #step1
    // would you like to change the dependencies key in package.json? i often change this to match the name of the company im working with.
    //
    // done! preparing config.
    // "saving .s3npm.json config file in "+process.cwd()+". Would you like to change it?"
    // this config file will apply to all modules in directories below this one that do not have a config file themselves.

    // dump json


    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    }); 

    rl.question("", function(answer) {
      // TODO: Log the answer in a database
      console.log("Thank you for your valuable feedback:", answer);

      rl.close();
      cb();
    });
    
    rl.question("What do you think of node.js? ", function(answer) {

    });

  });
}
