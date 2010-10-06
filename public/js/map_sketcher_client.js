function MapSketcherClient(options) {
  if (! (this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }

  var self = this;

  self.settings =
  {  port: options.port
  ,  hostname: options.hostname
  };

  var init = function() {
    setupBayeuxClient();
  }

  var setupBayeuxClient = function() {
    self.socket = new Faye.Client("http://"
        + self.settings.hostname
        + ':' + self.settings.port 
        + '/socket', {
      timeout: 120
    });
  }

  init();
}

MapSketcherClient.prototype.subscribe = function(chanel,callback) {
  this.socket.subscribe(chanel,callback);
}

MapSketcherClient.prototype.launch = function() {
  var self = this;

  self.globalRoom = new Room(
  { client: self
  , name: 'global'
  , dom: document.getElementById('global')
  , editable: false
  });

  self.personalRoom = new Room(
  { client: self
  , name: 'personal'
  , dom: document.getElementById('personal')
  , persisted: false
  });

  self.personalRoom.setActive(true);
}

MapSketcherClient.prototype.getWorkspaceMapDom = function() {
  return document.getElementById('map');
}
