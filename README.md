node-s3-npm
===========

[![Build Status](https://travis-ci.org/soldair/node-s3-npm.png)](https://travis-ci.org/soldair/node-s3-npm)

Publish packages to your own s3 bucket, install and resolve nested private or public deps without replacing or hacking npm.

Usage
======
Add an `.s3npm.json` to ~/ or your project directory:
``` json
{ "defaultBucket": "bucket-name"
, "key": "aws-key"
, "secret": "aws-secret"
, "dependenciesKey": "optional package.json key for s3 deps, defaults to 's3Dependencies'"
}
```
Then run `s3npm install` to install private s3 backed dependencies.


Install
======
``` js
npm install -g s3npm
```
