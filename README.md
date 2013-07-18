THIS DOCUMENTATION IS A WORK IN PROGRESS.

[![npm](https://nodei.co/npm/s3npm.png)](https://npmjs.org/package/s3npm)
[![Build Status](https://travis-ci.org/soldair/node-s3-npm.png)](https://travis-ci.org/soldair/node-s3-npm)

node-s3-npm
===========

Publish packages to your own s3 bucket, install and resolve nested private or public deps without replacing or hacking npm.


Install
======

``` sh
npm install -g s3npm
```

configure #TODO im working on this now.

```sh
s3npm configure
```

following the setup you just use npm normally
```sh
npm install
```
to setup a package update your `package.json` file to include 
  - `s3Dependencies`
  - depend on `s3npm`
  - and run s3npm in the postinstall hook

```js
{
  "s3Dependencies":{
    "packagename":"~x.x.x-anysemver"
  },
  "dependencies":{
    "s3npm":"~x.x.x"
  },
  "scripts":{
    "test":.....
    "postinstall":"s3npm install"
  },
}
```

WORKFLOW
========

publishing a module to your bucket
----------------------------------

`cd` to your module
```sh
s3npm publish
````
> I attempted a solution without s3npm globally. <a href="#prepublish">see prepublish footnote.</a>

to install a module that depends on s3 modules
----------------------------------------------

you just use `npm install` normally, but the projects package.json will need a postinstall hook that executes s3npm install
 

DETAILS
=======

configure!
----------

s3npm looks for the most local `.s3npm.json` file from the root of the package that you are installing or from `process.cwd()`

to create the json file you may.

```sh
s3npm configure
```
this will ask you for your 
  - amazon keys if not in your environment 
  - the optional s3 bucket for your project 
  - and the directory to install the config information. 

if your aws credentials are not provided they will be read from the environment. #TODO 
if you do not specify a default bucket your package name must be prefixed with the bucket name delimited by / `bucketname/packagename`

> user managmanet with iam. oh my! <a href="#iam">see footnote.</a>

But automated deployments will probably want to create the file manually.

Add an `.s3npm.json` to your project directory
``` json
{ "defaultBucket": "bucket-name"
, "key": "aws-key"
, "secret": "aws-secret"
, "dependenciesKey": "optional package.json key for s3 deps, defaults to 's3Dependencies'"
}
```

depend!
-------

add s3npm as a dependency for your private module




footnotes
=========

<a name="prepublish"></a>
prepublish
----------
i attempted to use the prepublish hook to trigger s3npm publish and exit with a 1 to prevent the publish to the real registry.
  - prepublish is run on every npm install and i cannot find out that the context of the hook is install rather than publish. you probably dont want to publish every install so.. failure. 

<a name="iam"></a>
iam user accounts
-----------------
i feel that its important to be able to manage user accounts and access but IAM is hard. i started a module called iamhard but have not had time to finish it. this has to work awesome if its added at all.

<a name="npmdep"></a>
npm dependency
--------------
npm depends on many modules and the install is a bit slow. ideally i would not have to depend on it considering that npm is installed with all node deployments. 
- I should just be able to use it. With that i would have to worry about version issues etc probably bad. 
- with tests to implement the portions of npm that i need but i may skew from npm and no one likes bugs from divergent implementations.



