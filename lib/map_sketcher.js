var http = require('http'),
    static = require('node-static');
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
  self.httpServer = createHTTPServer(self);
  self.httpServer.listen(self.settings.port);
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
