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
    self.guid = Utils.guid();
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
  return this.socket.subscribe(chanel,callback);
}

MapSketcherClient.prototype.launch = function() {
  var self = this;

  self.globalRoom = new Room(
  { client: self
  , name: 'global'
  , dom: document.getElementById('global')
  , editable: false
  });

  self.personalRooms = [];
  self.createNewPersonalRoom();
  
  $('#newRoom').click(function(){
    self.createNewPersonalRoom();
  });
}

MapSketcherClient.prototype.getWorkspaceMapDom = function() {
  return document.getElementById('map');
}

MapSketcherClient.prototype.createNewPersonalRoom = function() {
  var id = Utils.guid();
  var div = document.createElement('div');
  div.id = id;
  div.className = "miniRoom";

  $('#personal').append(div);
  var room = new Room(
  { client: this
  , name: id
  , dom: div
  , persisted: false
  })

  this.personalRooms.push(room);
  room.setActive(true);
}

MapSketcherClient.prototype.sendMove = function(room, pos) {
  this.socket.publish(room.roomPath('moves'), 
  { client: this.guid
  , position: pos
  });
  
}

MapSketcherClient.prototype.removeSketch = function(room, sketch) {
  var data = {
    id: sketch.id
  , type: 'delete'
  , client: this.guid
  }

  this.socket.publish(room.roomPath('sketches'), data);
}

MapSketcherClient.prototype.sendSketch = function(room, sketch) {
  var data = sketch.to_json();
  data.client = this.guid;
  data.type = 'new';

  this.socket.publish(room.roomPath('sketches'), data);
}

MapSketcherClient.prototype.joinColaborativeRoom = function(room) {
  var oldRoom = this.selectedRoom;

  this.selectedRoom = new Room(
  { client: this
  , name: room
  , dom: document.getElementById('selected')
  });

  this.selectedRoom.setActive(true);

  if (oldRoom) {
    oldRoom.stop();
  }
}
