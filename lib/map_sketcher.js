var http    = require('http')
,   static  = require('node-static')
,   sys     = require('sys')
,   express = require('express')
,   faye    = require('faye')
;

function MapSketcher(options) {
  if (! (this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }

  var self = this;

  self.settings = {
    port: options.port
  };

  self.init();
}

MapSketcher.prototype.init = function() {
  self = this; 
  self.bayeux = createBayeuxServer(self);
  self.app = createExpressApp(self);

  self.bayeux.attach(self.app);
  self.app.listen(self.settings.port);

  self.app.get('/config.json', function(req, res){
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.write(JSON.stringify({
      port: self.settings.port
    }));
    res.end();
  });
  
  self.app.post('/rooms/:id/sketches.json', function(rew,res) {
    // Store at CouchDB
    // Send to socket
    // Answer OK
  });
    

  sys.log('Server started on PORT ' + self.settings.port);
}

function createBayeuxServer(self) {
  var bayeux = new faye.NodeAdapter({
    mount: '/socket',
    timeout: 45
  });
  
  return bayeux;

}

function createExpressApp(self) {
  var app = express.createServer();

  app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyDecoder());
    app.use(app.router);
    app.use(express.staticProvider('./public'));
  });

  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

  app.configure('production', function(){
    app.use(express.errorHandler());
  });

  return app;
}

function createHTTPServer(self) {
  var server = http.createServer(function(request, response) {
    var file = new static.Server('./public', {
      cache: false
    });

    request.addListener('end', function() {
      file.serve(request, response);
    });
  });
  
  return server;
}

module.exports = MapSketcher;
