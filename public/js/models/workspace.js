function Workspace(room) {
  var self = this;
  self.room = room;
  self.client = self.room.client;
  self.mode = 'panning';
  self.canvas = new Canvas(self);
}

Workspace.prototype.start = function() {
  var self = this;

  self.map = new Map({
    dom: self.client.getWorkspaceMapDom()
  , controllable: true 
  , position: self.room.currentPosition
  , showCredits: true
  });

  self.map.onMove(function(position) {
    self.room.moveTo(position, 
    { userMove: self.map.userMove
    });
  });

  $('#toggleModeButton').click(function() {
    if (self.mode == 'panning')
      self.switchTo('drawing')
    else 
      self.switchTo('panning')

    return false;
  });

  _.each(self.room.sketches, function(sketch) {
    self.addSketch(sketch);
  });
}

Workspace.prototype.addSketch = function(sketch) {
  var self = this;
  sketch.drawAt(self.map,
      { click: function() {
          self.room.destroy(this);
        }
      });
}

Workspace.prototype.moveTo = function(pos) {
  var self = this;
  self.map.moveTo(pos);
}

Workspace.prototype.stop = function() {
  self.map = null;
  $('#toggleModeButton').unbind('click');
}

Workspace.prototype.switchTo= function(mode) {
  var self = this;
  self.mode = mode;

  switch(self.mode) {
    case 'panning':
      self.map.unlock();
      self.canvas.stop();
      break;
    case 'drawing':
      self.map.lock();
      self.canvas.start();
      break;
  }
}

Workspace.prototype.save = function(sketch) {
  this.room.save(sketch);
}
