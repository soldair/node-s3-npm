
var shafile = require('./shafile');
var readme = require('packagereadme');
var gitconfig = require('packagegitconfig');
var path = require('path');
var log = require('./log');

module.exports = function(config,root,tar,packagejson,cb){
  var c = 3
  , registry = config.registry||'http://localhost:8012'
  , errors = []
  , done = function(err){
    if(err) errors.push(err);
    c--;
    if(c) return;

    console.log('SHOULD BE CALLING BACK');

    cb(errors.length?errors:false,obj);
  }
  ,obj = {
    _id:packagejson.name,
    name:packagejson.name,
    description:packagejson.description,
    author:packagejson.author,
    maintainers:[
      packagejson.author
    ],
    times:{},
    'dist-tags':{
      latest:packagejson.version
    },
    versions:{}
  }
  ,versionObj = _ext({},packagejson)
  ;

  obj.times[packagejson.version] = (new Date()).toJSON();
  obj.versions[packagejson.version] = versionObj;
  versionObj._id = packagejson.name+'@'+packagejson.version;

  // for now require bucket.
  // its probably an easy fix later to use a default bucket.
  if(config.bucket) packagejson.s3bucket = config.bucket;

  if(!packagejson.s3bucket) {
    return cb(new Error('package json is required to have a s3bucket property to publish. or --bucket'));
  }

  readme(root,function(err,data){

    obj.readme = data||'no readme found.';
    versionObj.readme = data||'no readme found.';
    done();
  });

  gitconfig(root,function(err,data){
    if(data && data.remote && data.remote.origin) {
      versionObj.respository = {
        url:data.remote.origin.url,
        github:data.github,
        git:true
      };
    }
    done();
  });

  shafile(tar,function(err,sha){
    if(err) return done(err);
    versionObj.dist = {
      sha:sha,
      tarball:config.registry+'/'+path.basename(tar)
    };
    done();  
  });
};

function _ext(o,o2){
  o = o||{};
  Object.keys(o2||{}).forEach(function(k){
    o[k] = o2[k];
  });
  return o;
}
/*
{
   "repository" : {
      "url" : "git://github.com/soldair/node-walkdir.git",
      "type" : "git"
   },
   "maintainers" : [
      {
         "email" : "soldair@gmail.com",
         "name" : "soldair"
      }
   ],
   "time" : {
      "0.0.1" : "2012-03-25T21:37:32.996Z",
      "0.0.2" : "2012-05-31T16:19:48.222Z",
      "0.0.5" : "2012-09-08T21:51:07.010Z",
      "0.0.4" : "2012-06-17T15:10:43.952Z",
      "0.0.3" : "2012-06-12T00:38:38.260Z",
      "0.0.7" : "2013-04-21T15:12:18.829Z"
   },
   "readme" : "",
   "_id" : "walkdir",
   "name" : "walkdir",
   "author" : {
      "email" : "soldair@gmail.com",
      "name" : "Ryan Day"
   },
   "dist-tags" : {
      "latest" : "0.0.7"
   },
   "description" : "Find files simply. Walks a directory tree emitting events based on what it finds. Presents a familliar callback/emitter/a+sync interface. Walk a tree of any depth.",
   "_rev" : "13-6726e5d8279ff73880dab5882554c6fe",
   "versions" : {
      "0.0.1" : {
         "engines" : {
            "node" : ">=0.6.0"
         },
         "directories" : {},
         "readme" : "",
         "_id" : "walkdir@0.0.1",
         "dependencies" : {},
         "optionalDependencies" : {},
         "author" : {
            "email" : "soldair@gmail.com",
            "name" : "Ryan Day"
         },
         "keywords" : [
            "find",
            "walk",
            "tree",
            "files",
            "fs"
         ],
         "scripts" : {
            "test" : "./test.sh"
         },
         "repository" : {
            "url" : "git://github.com/soldair/node-walkdir.git",
            "type" : "git"
         },
         "maintainers" : [
            {
               "email" : "soldair@gmail.com",
               "name" : "soldair"
            }
         ],
         "_npmVersion" : "1.1.12",
         "_npmUser" : {
            "email" : "soldair@gmail.com",
            "name" : "soldair"
         },
         "_engineSupported" : true,
         "version" : "0.0.1",
         "_defaultsLoaded" : true,
         "name" : "walkdir",
         "dist" : {
            "shasum" : "cf94c85e2788cb42b00679f38433a8225ec6feda",
            "tarball" : "http://registry.npmjs.org/walkdir/-/walkdir-0.0.1.tgz"
         },
         "description" : "Find files simply. Walks a directory tree emitting events based on what it finds. Presents a familliar callback/emitter/a+sync interface. Walk a tree of any depth.",
         "_nodeVersion" : "v0.6.14",
         "main" : "./walkdir.js",
         "homepage" : "http://github.com/soldair/node-walkdir",
         "devDependencies" : {
            "tap" : "*",
            "jshint" : "0.5.x"
         }
      },
      "0.0.2" : {
         "engines" : {
            "node" : ">=0.6.0"
         },
         "directories" : {},
         "readme" : "",
         "_id" : "walkdir@0.0.2",
         "dependencies" : {},
         "optionalDependencies" : {},
         "author" : {
            "email" : "soldair@gmail.com",
            "name" : "Ryan Day"
         },
         "keywords" : [
            "find",
            "walk",
            "tree",
            "files",
            "fs"
         ],
         "contributors" : [
            {
               "name" : "tjfontaine"
            }
         ],
         "scripts" : {
            "test" : "./test.sh"
         },
         "repository" : {
            "url" : "git://github.com/soldair/node-walkdir.git",
            "type" : "git"
         },
         "maintainers" : [
            {
               "email" : "soldair@gmail.com",
               "name" : "soldair"
            }
         ],
         "_npmVersion" : "1.1.21",
         "_engineSupported" : true,
         "_npmUser" : {
            "email" : "soldair@gmail.com",
            "name" : "soldair"
         },
         "version" : "0.0.2",
         "_defaultsLoaded" : true,
         "name" : "walkdir",
         "dist" : {
            "shasum" : "1be46e4ff3ef70d3a0cf23e74b6c1b0b738efb13",
            "tarball" : "http://registry.npmjs.org/walkdir/-/walkdir-0.0.2.tgz"
         },
         "description" : "Find files simply. Walks a directory tree emitting events based on what it finds. Presents a familliar callback/emitter/a+sync interface. Walk a tree of any depth.",
         "_nodeVersion" : "v0.6.17",
         "main" : "./walkdir.js",
         "homepage" : "http://github.com/soldair/node-walkdir",
         "devDependencies" : {
            "tap" : "*",
            "jshint" : "0.5.x"
         }
      },
      "0.0.5" : {
         "engines" : {
            "node" : ">=0.6.0"
         },
         "directories" : {},
         "_id" : "walkdir@0.0.5",
         "readme" : "[![Build Status](https://secure.travis-ci.org/soldair/node-walkdir.png)](http://travis-ci.org/soldair/node-walkdir)\n\n## walkdir\n\nFind files. Walks a directory tree emitting events based on what it finds. Presents a familliar callback/emitter/sync interface. Walk a tree of any depth. This is a performant option any pull requests to make it more so will be talken into consderation.. \n\n## Example\n\n```js\n\nvar walk = require('walkdir');\n\n//async with path callback \n\nwalk('../',function(path,stat){\n  console.log('found: ',path);\n});\n\n//use async emitter to capture more events\n\nvar emitter = walk('../');\n\nemitter.on('file',function(filename,stat){\n  console.log('file from emitter: ', filename);\n});\n\n\n//sync with callback\n\nwalk.sync('../',function(path,stat){\n  console.log('found sync:',path);\n});\n\n//sync just need paths\n\nvar paths = walk.sync('../');\nconsole.log('found paths sync: ',paths);\n\n```\n\n\n## install\n\n\tnpm install walkdir\n\n## arguments\n\nwalkdir(path, [options], [callback])\nwalkdir.sync(path, [options], [callback]);\n\n- path\n  - the starting point of your directory walk\n\n- options. supported options are\n  - general\n\n\t```js\n\t{\n\t\"follow_symlinks\":false, // default is off \n\t\"no_recurse\":false,      // only recurse one level deep\n\t\"max_depth\":undefined    // only recurse down to max_depth. if you need more than no_recurse\n\t}\n\t```\n\n  - sync only\n\n\t```js\n\t{\n\t\"return_object\":false, // if true the sync return will be in {path:stat} format instead of [path,path,...]\n\t\"no_return\":false, // if true null will be returned and no array or object will be created with found paths. useful for large listings\n\t}\n\t```\n\n- callback\n  - this is bound to the path event of the emitter. its optional in all cases.\n\n\t```js\n\tcallback(path,stat)\n\t```\n\n## events\n\nnon error type events are emitted with (path,stat). stat is an instanceof fs.Stats\n\n###path\nfired for everything\n\n###file\nfired only for regular files\n\n###directory\nfired only for directories\n\n###link\nfired when a symbolic link is found\n\n###end\nfired when the entire tree has been read and emitted.\n\n###socket\nfired when a socket descriptor is found\n\n###fifo\nfired when a fifo is found\n\n###characterdevice\nfired when a character device is found\n\n###blockdevice\nfired when a block device is found\n\n###targetdirectory\nfired for the stat of the path you provided as the first argument. is is only fired if it is a directory.\n\n###empty\nfired for empty directory\n\n## error events\nerror type events are emitted with (path,error). error being the error object returned from an fs call or other opperation.\n\n###error\nif the target path cannot be read an error event is emitted. this is the only failure case.\n\n###fail\nwhen stat or read fails on a path somewhere in the walk and it is not your target path you get a fail event instead of error.\nThis is handy if you want to find places you dont have access too.\n\n## notes\nthe async emitter returned supports 3 methods\n\n###end\n  stop a walk in progress\n\n###pause\n  pause the walk. no more events will be emitted until resume\n\n###resume\n  resume the walk\n\n### cancel a walk in progress\n  ```js\n  //cancel a walk in progress within callback.\n\n  var walk = require('walkdir');\n  walk('../',function(path,stat){\n    this.end();\n  });\n\n  //cancel a walk in progress with emitter handle\n  var walk = require('walkdir');\n  var emitter = walk('../');\n\n  doSomethingAsync(function(){\n\temitter.end();\n  })\n  ```\n\n## thanks\nthanks to substack. the interface for this module is based off of node-findit\n\n",
         "author" : {
            "email" : "soldair@gmail.com",
            "name" : "Ryan Day"
         },
         "keywords" : [
            "find",
            "walk",
            "tree",
            "files",
            "fs"
         ],
         "contributors" : [
            {
               "name" : "tjfontaine"
            }
         ],
         "scripts" : {
            "test" : "./test.sh"
         },
         "repository" : {
            "url" : "git://github.com/soldair/node-walkdir.git",
            "type" : "git"
         },
         "maintainers" : [
            {
               "email" : "soldair@gmail.com",
               "name" : "soldair"
            }
         ],
         "_npmVersion" : "1.1.59",
         "_npmUser" : {
            "email" : "soldair@gmail.com",
            "name" : "soldair"
         },
         "version" : "0.0.5",
         "name" : "walkdir",
         "dist" : {
            "shasum" : "8b36be89c4f189249fd2d931cf133ba0c1c6fde8",
            "tarball" : "http://registry.npmjs.org/walkdir/-/walkdir-0.0.5.tgz"
         },
         "description" : "Find files simply. Walks a directory tree emitting events based on what it finds. Presents a familliar callback/emitter/a+sync interface. Walk a tree of any depth.",
         "license" : "MIT/X11",
         "main" : "./walkdir.js",
         "homepage" : "http://github.com/soldair/node-walkdir",
         "devDependencies" : {
            "tap" : "*",
            "jshint" : "0.5.x"
         }
      },
      "0.0.4" : {
         "engines" : {
            "node" : ">=0.6.0"
         },
         "directories" : {},
         "readme" : "",
         "_id" : "walkdir@0.0.4",
         "dependencies" : {},
         "optionalDependencies" : {},
         "author" : {
            "email" : "soldair@gmail.com",
            "name" : "Ryan Day"
         },
         "keywords" : [
            "find",
            "walk",
            "tree",
            "files",
            "fs"
         ],
         "contributors" : [
            {
               "name" : "tjfontaine"
            }
         ],
         "scripts" : {
            "test" : "./test.sh"
         },
         "repository" : {
            "url" : "git://github.com/soldair/node-walkdir.git",
            "type" : "git"
         },
         "maintainers" : [
            {
               "email" : "soldair@gmail.com",
               "name" : "soldair"
            }
         ],
         "_npmVersion" : "1.1.24",
         "_engineSupported" : true,
         "_npmUser" : {
            "email" : "soldair@gmail.com",
            "name" : "soldair"
         },
         "version" : "0.0.4",
         "_defaultsLoaded" : true,
         "name" : "walkdir",
         "dist" : {
            "shasum" : "1c04721f9e8df7cf333048633ce5c287d7994849",
            "tarball" : "http://registry.npmjs.org/walkdir/-/walkdir-0.0.4.tgz"
         },
         "description" : "Find files simply. Walks a directory tree emitting events based on what it finds. Presents a familliar callback/emitter/a+sync interface. Walk a tree of any depth.",
         "license" : "MIT/X11",
         "_nodeVersion" : "v0.6.19",
         "main" : "./walkdir.js",
         "homepage" : "http://github.com/soldair/node-walkdir",
         "devDependencies" : {
            "tap" : "*",
            "jshint" : "0.5.x"
         }
      },
      "0.0.3" : {
         "engines" : {
            "node" : ">=0.6.0"
         },
         "directories" : {},
         "readme" : "",
         "_id" : "walkdir@0.0.3",
         "dependencies" : {},
         "optionalDependencies" : {},
         "author" : {
            "email" : "soldair@gmail.com",
            "name" : "Ryan Day"
         },
         "keywords" : [
            "find",
            "walk",
            "tree",
            "files",
            "fs"
         ],
         "contributors" : [
            {
               "name" : "tjfontaine"
            }
         ],
         "scripts" : {
            "test" : "./test.sh"
         },
         "repository" : {
            "url" : "git://github.com/soldair/node-walkdir.git",
            "type" : "git"
         },
         "maintainers" : [
            {
               "email" : "soldair@gmail.com",
               "name" : "soldair"
            }
         ],
         "_npmVersion" : "1.1.24",
         "_engineSupported" : true,
         "_npmUser" : {
            "email" : "soldair@gmail.com",
            "name" : "soldair"
         },
         "version" : "0.0.3",
         "_defaultsLoaded" : true,
         "name" : "walkdir",
         "dist" : {
            "shasum" : "84a162ece83d6c97f9066e9df512d2fa79c0c94b",
            "tarball" : "http://registry.npmjs.org/walkdir/-/walkdir-0.0.3.tgz"
         },
         "description" : "Find files simply. Walks a directory tree emitting events based on what it finds. Presents a familliar callback/emitter/a+sync interface. Walk a tree of any depth.",
         "license" : "MIT/X11",
         "_nodeVersion" : "v0.6.19",
         "main" : "./walkdir.js",
         "homepage" : "http://github.com/soldair/node-walkdir",
         "devDependencies" : {
            "tap" : "*",
            "jshint" : "0.5.x"
         }
      },
      "0.0.7" : {
         "engines" : {
            "node" : ">=0.6.0"
         },
         "directories" : {},
         "_from" : ".",
         "_id" : "walkdir@0.0.7",
         "readme" : "[![Build Status](https://secure.travis-ci.org/soldair/node-walkdir.png)](http://travis-ci.org/soldair/node-walkdir)\n \n## walkdir\n\nFind files. Walks a directory tree emitting events based on what it finds. Presents a familliar callback/emitter/sync interface. Walk a tree of any depth. This is a performant option any pull requests to make it more so will be talken into consderation.. \n\n## Example\n\n```js\n\nvar walk = require('walkdir');\n\n//async with path callback \n\nwalk('../',function(path,stat){\n  console.log('found: ',path);\n});\n\n//use async emitter to capture more events\n\nvar emitter = walk('../');\n\nemitter.on('file',function(filename,stat){\n  console.log('file from emitter: ', filename);\n});\n\n\n//sync with callback\n\nwalk.sync('../',function(path,stat){\n  console.log('found sync:',path);\n});\n\n//sync just need paths\n\nvar paths = walk.sync('../');\nconsole.log('found paths sync: ',paths);\n\n```\n\n\n## install\n\n\tnpm install walkdir\n\n## arguments\n\nwalkdir(path, [options], [callback])\nwalkdir.sync(path, [options], [callback]);\n\n- path\n  - the starting point of your directory walk\n\n- options. supported options are\n  - general\n\n\t```js\n\t{\n\t\"follow_symlinks\":false, // default is off \n\t\"no_recurse\":false,      // only recurse one level deep\n\t\"max_depth\":undefined    // only recurse down to max_depth. if you need more than no_recurse\n\t}\n\t```\n\n  - sync only\n\n\t```js\n\t{\n\t\"return_object\":false, // if true the sync return will be in {path:stat} format instead of [path,path,...]\n\t\"no_return\":false, // if true null will be returned and no array or object will be created with found paths. useful for large listings\n\t}\n\t```\n\n- callback\n  - this is bound to the path event of the emitter. its optional in all cases.\n\n\t```js\n\tcallback(path,stat)\n\t```\n\n## events\n\nnon error type events are emitted with (path,stat). stat is an instanceof fs.Stats\n\n###path\nfired for everything\n\n###file\nfired only for regular files\n\n###directory\nfired only for directories\n\n###link\nfired when a symbolic link is found\n\n###end\nfired when the entire tree has been read and emitted.\n\n###socket\nfired when a socket descriptor is found\n\n###fifo\nfired when a fifo is found\n\n###characterdevice\nfired when a character device is found\n\n###blockdevice\nfired when a block device is found\n\n###targetdirectory\nfired for the stat of the path you provided as the first argument. is is only fired if it is a directory.\n\n###empty\nfired for empty directory\n\n## error events\nerror type events are emitted with (path,error). error being the error object returned from an fs call or other opperation.\n\n###error\nif the target path cannot be read an error event is emitted. this is the only failure case.\n\n###fail\nwhen stat or read fails on a path somewhere in the walk and it is not your target path you get a fail event instead of error.\nThis is handy if you want to find places you dont have access too.\n\n## notes\nthe async emitter returned supports 3 methods\n\n###end\n  stop a walk in progress\n\n###pause\n  pause the walk. no more events will be emitted until resume\n\n###resume\n  resume the walk\n\n### cancel a walk in progress\n  ```js\n  //cancel a walk in progress within callback.\n\n  var walk = require('walkdir');\n  walk('../',function(path,stat){\n    this.end();\n  });\n\n  //cancel a walk in progress with emitter handle\n  var walk = require('walkdir');\n  var emitter = walk('../');\n\n  doSomethingAsync(function(){\n\temitter.end();\n  })\n  ```\n\n## thanks\nthanks to substack. the interface for this module is based off of node-findit\n\n",
         "author" : {
            "email" : "soldair@gmail.com",
            "name" : "Ryan Day"
         },
         "keywords" : [
            "find",
            "walk",
            "tree",
            "files",
            "fs"
         ],
         "readmeFilename" : "readme.md",
         "contributors" : [
            {
               "name" : "tjfontaine"
            }
         ],
         "scripts" : {
            "test" : "./test.sh"
         },
         "repository" : {
            "url" : "git://github.com/soldair/node-walkdir.git",
            "type" : "git"
         },
         "maintainers" : [
            {
               "email" : "soldair@gmail.com",
               "name" : "soldair"
            }
         ],
         "_npmVersion" : "1.2.17",
         "_npmUser" : {
            "email" : "soldair@gmail.com",
            "name" : "soldair"
         },
         "version" : "0.0.7",
         "name" : "walkdir",
         "dist" : {
            "shasum" : "04da0270a87a778540173cdbf0a2db499a8d9e29",
            "tarball" : "http://registry.npmjs.org/walkdir/-/walkdir-0.0.7.tgz"
         },
         "description" : "Find files simply. Walks a directory tree emitting events based on what it finds. Presents a familliar callback/emitter/a+sync interface. Walk a tree of any depth.",
         "license" : "MIT/X11",
         "main" : "./walkdir.js",
         "homepage" : "http://github.com/soldair/node-walkdir",
         "devDependencies" : {
            "tap" : "*",
            "jshint" : "0.5.x"
         }
      }
   },
*/
