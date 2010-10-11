function Canvas(workspace) {
  var self = this;
  self.workspace = workspace;
  self.drawing = false;
  self.dom = $('<div id="canvas"></div>');

  self.dom.mousedown(function(event) {
    self.onDrawStart(event);
  });
  self.dom.bind('touchstart',function(event) {
    self.onDrawStart(event);
  });
  self.dom.mousemove(function(event) {
    self.onDraw(event);
  });
  self.dom.bind('touchmove',function(event) {
    self.onDraw(event);
  });
  self.dom.mouseup(function(event) {
    self.onDrawEnd(event);
  });
  self.dom.bind('touchend',function(event) {
    self.onDrawEnd(event);
  });
}

Canvas.prototype.start = function() {
  this.dom.appendTo('#map');
}

Canvas.prototype.stop = function() {
  this.dom.detach();
}

Canvas.prototype.onDrawStart = function(event) {
  this.drawing = true;
  this.sketch = this.sketch || new Sketch();
  this.polyline = new Polyline();
  this.polyline.setMap(this.workspace.map);
}
Canvas.prototype.onDrawEnd = function(event) {
  this.drawing = false;
  this.sketch.addPolyline(this.polyline);
  this.polyline.setMap(null);
  this.workspace.save(this.sketch);
  this.sketch = null;
}
Canvas.prototype.onDraw = function(event) {
  event.preventDefault();
  if (!this.drawing) return;

  event = event.originalEvent || event;

  // This is not a touch devise?
  if (!event.touches) event.touches = [event];
  if (event.touches.length > 1) return;

  var touch = event.touches[0];

  var position = this.workspace.map.getXYPosition(touch.pageX, touch.pageY);
  this.polyline.addPoint(position);
}
