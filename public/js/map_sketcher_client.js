function MapSketcherClient(options) {
  if (! (this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }

  var self = this;

  self.settings =
  {  port: options.port
  ,  hostname: options.hostname
  };

function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}


  var init = function() {
    setupBayeuxClient();
    self.guid = guid();
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

MapSketcherClient.prototype.sendMove = function(room, pos) {
  this.socket.publish(room.roomPath('moves'), 
  { client: this.guid
  , position: pos
  });
  
}

MapSketcherClient.prototype.sendSketch = function(room, sketch) {
  var data = sketch.to_json();
  data.client = this.guid;

  this.socket.publish(room.roomPath('sketches'), data);
}
