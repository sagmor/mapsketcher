var Objects = (function(){
  var Objects = function(selector) {
    this.sketches = {};
  }
  
  Objects.prototype.setMap = setProperty('map');
  Objects.prototype.setMinimap = setProperty('minimap');
  
  Objects.prototype.getMap = getProperty('map');
  Objects.prototype.getMinimap = getProperty('minimap');
  
  Objects.prototype.start = function() {
    var _this = this;
    jQuery.getJSON('/sketches.json', function(data) {
      _.each(data, function(sketch) {
        _this.add(new Sketch(sketch));
      });
    });
  }

  Objects.prototype.add = function(sketch) {
    if (this.sketches[sketch.id]) return;
    
    this.sketches[sketch.id] = sketch;
    this.map.draw(sketch);
    this.minimap.draw(sketch);
  }
  
  Objects.prototype.remove = function(sketch) {
    if (!this.sketches[sketch.id]) return;
    
    this.sketches[sketch.id] = null;
    this.map.undraw(sketch);
    this.minimap.undraw(sketch);
  }
  
  return Objects;
})();
