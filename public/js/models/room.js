function Room(options) {
  if (! (this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }

  this.client = options.client;
  this.name = options.name;
  this.dom = options.dom;
  this.editable = (typeof options.editable == 'undefined') ?
    true : options.editable;
  this.persisted = (typeof options.persisted == 'undefined') ?
    true : options.editable;

  this.currentPosition = 
  { lat: -33.457788
  , lng: -70.664105
  , zoom: 16
  }

  this.start();
}

Room.prototype.start = function() {
  var self = this;

  // Subscribe to sketch updates.
  if (self.persisted)
    self.client.subscribe(self.roomPath('sketches'), function(sketch) {
      self.add(sketch);
    });

  // Download preiows sketches
  // TODO

  // Display Map
  self.map = new Map({
    dom: self.dom
  , controllable: false
  , position:
    { lat: self.currentPosition.lat
    , lng: self.currentPosition.lng
    , zoom: self.currentPosition.zoom - 4
    }
  });

  self.map.onClick(function() {
    self.setActive(true);
  });
}

Room.prototype.roomPath = function(zone) {
  return '/room/' + this.name + '/' + zone;
}

Room.prototype.stop = function() {
  var self = this;
  if (self.persisted)
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
