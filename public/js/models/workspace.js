function Workspace(room) {
  var self = this;
  self.room = room;
  self.client = self.room.client;
}

Workspace.prototype.start = function() {
  var self = this;

  self.map = new Map({
    dom: self.client.getWorkspaceMapDom()
  , controllable: true 
  , position: self.room.currentPosition
  });

  self.map.onMove(function(position) {
    self.room.moveTo(position, true);
  })

}
