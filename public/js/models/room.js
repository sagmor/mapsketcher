function Room(options) {
  if (! (this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }

  this.sketches = [];
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
  if (self.persisted) {
    self.client.subscribe(self.roomPath('sketches'), function(sketch) {
      self.add(sketch);
    });
    self.client.subscribe(self.roomPath('moves'), function(data) {
      if (data.client != self.client.guid)
        self.moveTo(data.position)
    });
  }
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
  
Room.prototype.save = function(sketch) {
  if(this.persisted) {
    this.client.sendSketch(this, sketch);
  } else {
    this.add(sketch.to_json());
  }
}

Room.prototype.add = function(data) {
  var sketch = new Sketch(data);
  this.sketches.push(sketch);

  sketch.drawAt(this.map);
  if(this.workspace)
    sketch.drawAt(this.workspace.map);

  console.log(this.name, sketch);
}

Room.prototype.setActive = function(active) {
  var self = this;


  if (active) {
    if ( self.client.activeRoom == self ) return;
    if ( self.client.activeRoom )
      self.client.activeRoom.setActive(false);
    self.client.activeRoom = self;

    self.workspace = new Workspace(self);
    self.workspace.start();
    self.dom.style.border = "3px solid red";
  } else {
    self.workspace.stop();
    self.workspace = null;
    self.dom.style.border = "";
  }
}

Room.prototype.moveTo = function(pos, options) {

  if( this.currentPosition == pos) return;

  this.currentPosition = pos;
  this.map.moveTo({
    lat: pos.lat
  , lng: pos.lng
  , zoom: pos.zoom - 4
  });

  if (options && options.userMove) {
    if (this.persisted) this.client.sendMove(this, pos);
  } else {
    if (this.workspace) this.workspace.moveTo(pos);
  }

}
