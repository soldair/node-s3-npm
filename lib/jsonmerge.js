  info(config,packagejson.s3bucket+'/'+packagejson.name,function(err,json){
    
    if(err && err.code !== 'E_NOENT') return done(err);
    
    // is this version of this module already published?
    if(json && json.versions[packagejson.version]){
      var e = new Error('verison already published. incrememnt version or unpublish first.');
      e.code = 'E_DUP';
      return done(e);
    }

    done();
  });
