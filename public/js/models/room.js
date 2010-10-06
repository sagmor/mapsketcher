function Room(options) {
  if (! (this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }

  this.client = options.client;
  this.name = options.name;
  this.dom = options.dom;

  this.start();
}

Room.prototype.start = function() {
  var self = this;

  // Subscribe to sketch updates.
  self.client.subscribe(self.roomPath('sketches'), function(sketch) {
    self.add(sketch);
  });

  // Download preiows sketches
  // TODO

  // Display Map
  self.map = new Map({
    dom: self.dom
  , controllable: false
  });
}

Room.prototype.roomPath = function(zone) {
  return '/room/' + this.name + '/' + zone;
}

Room.prototype.stop = function() {
  var self = this;
  self.client.unsubscribe(self.roomPath('sketches'));
}
  
Room.prototype.add = function(sketch) {
  console.log(self.name, sketch);
}

Room.prototype.setActive = function(active) {
  var self = this;

  if ( self.client.activeRoom == self ) return;

  if (active) {
    if ( self.client.activeRoom )
      self.client.activeRoom.setActive(false);

    self.workspace = new Workspace(self);
    self.workspace.start();
  } else {
    self.workspace.stop();
    self.workspace = nil;
  }
}

Room.prototype.moveTo = function(pos, skipWorkspace) {
  this.currentPosition = pos;
  this.map.moveTo({
    lat: pos.lat
  , lng: pos.lng
  , zoom: pos.zoom - 4
  });

  if (!skipWorkspace && workspace)
    workspace.moveTo(pos);

}
