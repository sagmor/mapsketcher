var Canvas = (function(){
  var Canvas = function(map) {
    this.map = map;
    this.drawing = false;
    
    this.dom = $('<div id="canvas"></div>');
    this.dom[0].canvas = this;
    
    this.dom.mousedown(this.onDrawStart);
    this.dom.mousemove(this.onDraw);
    this.dom.mouseup(this.onDrawEnd);
    this.dom.dblclick(this.disable);
  }
  
  Canvas.prototype.enable = function() {
    this.dom.appendTo('#wrapper');
    
    this.overlay = new google.maps.OverlayView();
    this.overlay.draw = function() {};
    this.overlay.onRemove = function() {};
    this.overlay.setMap(this.map.map);
  }
  
  Canvas.prototype.disable = function() {
    $(this).detach();
    this.canvas.overlay.setMap(null);
    this.canvas.map.switchMode();
  }
  
  Canvas.prototype.onDrawStart = function(event) {
    this.canvas.drawing = true;
    this.canvas.sketch = new Sketch();
  }
  
  Canvas.prototype.onDraw = function(event) {
    if (!this.canvas.drawing) return;
    
    var location = this.canvas.overlay.getProjection().fromContainerPixelToLatLng(new google.maps.Point(event.clientX, event.clientY));
    this.canvas.sketch.append(location.lat(),location.lng());
    
    if (this.canvas.polyline) this.canvas.polyline.setMap(null);
    this.canvas.polyline = this.canvas.sketch.polyline()
    this.canvas.polyline.setMap(this.canvas.map.map);
  }
  
  Canvas.prototype.onDrawEnd = function(event) {
    this.canvas.onDraw.call(this, event);
    this.canvas.drawing = false;
    
    var polyline = this.canvas.polyline;
    this.canvas.polyline = null;
    this.canvas.sketch.save(this.canvas.map.objects);
  }
  
 
  return Canvas;
})();
