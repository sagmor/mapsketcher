function Room(options) {
  if (! (this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }

  this.sketches = [];
  this.subscriptions = [];
  this.client = options.client;
  this.name = options.name.toLowerCase();
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

  if (self.persisted) {
    // Subscribe to sketch updates.
    self.subscriptions.push(self.client.subscribe(self.roomPath('sketches'), function(sketch) {
      if (sketch.type == 'new')
        self.add(sketch);
      else if (sketch.type == 'delete')
        self.remove(sketch);

    }));
    self.subscriptions.push(self.client.subscribe(self.roomPath('moves'), function(data) {
      if (data.client != self.client.guid)
        self.moveTo(data.position)
    }));

    // Download preiows sketches
    $.getJSON('/rooms/'+ this.name +'/sketches.json', function(data) {
      _.each(data.sketches, function(sketch) {
         self.add(sketch);
      });
    })
  }

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

  self.drag = new webkit_draggable(self.dom.id, {revert: 'always'});
  self.dom.room = self;
  self.drop = webkit_drop.add(self.dom.id, {onDrop: function(dragable) {
    self.copySketches(dragable.room);
  }});
}

Room.prototype.copySketches = function(room) {
  var self = this;
  _.each(room.sketches, function(sketch) {
    self.save(sketch);
  })
}

Room.prototype.roomPath = function(zone) {
  return '/room/' + this.name + '/' + zone;
}

Room.prototype.stop = function() {
  var self = this;

  _.each(self.subscriptions, function(s) {
    s.cancel();
  });
}
  
Room.prototype.save = function(sketch) {
  if(this.persisted) {
    this.client.sendSketch(this, sketch);
  } else {
    this.add(sketch.to_json());
  }
}

Room.prototype.destroy = function(sketch) {
  if(this.persisted) {
    this.client.removeSketch(this, sketch);
  } else {
    this.remove(sketch.to_json());
  }
}

Room.prototype.add = function(data) {
  var sketch = new Sketch(data);
  this.sketches.push(sketch);

  sketch.drawAt(this.map);
  if(this.workspace)
    this.workspace.addSketch(sketch);
}

Room.prototype.remove = function(data) {
  var sketch = _.detect(this.sketches, function(s) { return s.id == data.id });
  if (sketch) {
    this.sketches = _.without(this.sketches, sketch);
    sketch.destroy();
  }
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
