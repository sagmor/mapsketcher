var Map = (function(){
  var Map = function(selector, objects) {
    this.selector = selector;
    this.objects = objects;
    this.canvas = null;
    this.mode = 'drag'

    this.map = new google.maps.Map($(selector)[0], {
      zoom: 16,
      center: new google.maps.LatLng(-33.457788,-70.664105),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      disableDoubleClickZoom: true
    });
    
    map = this;
    google.maps.event.addListener(this.map, 'dblclick', function() {
      map.switchMode();
    });

    $(selector)[0].addEventListener('mousemove', function(event) {
      if (!map.isDrawing()) return;
      
      var x = event.clientX;
      var y = event.clientY;
      
      console.log([x, y]);

      return false;
    }, true);
    
    $(selector).bind('mousedown', function(event) {
      if (this.mode == 'draw') this.drawing = true;
    });
    
    $(selector).bind('mouseup', function(event) {
      this.drawing = false;
    });
    
  }
  
  Map.prototype.isDrawing = getProperty('drawing');
  
  Map.prototype.switchMode = function() {
    this.mode = (this.mode == 'drag' ? 'draw' : 'drag' );
    
    switch(this.mode) {
      case 'draw':
        this.canvas = this.canvas || new Canvas(this);
        this.map.setOptions({
          navigationControl: false,
        });
        this.canvas.enable();
        break;
      case 'drag':
        this.map.setOptions({
          navigationControl: true,
        });
        break;
    }
    
    return this.mode;
  }
  
  Map.prototype.draw = function(sketch) {
    var polyline = sketch.polyline();
    polyline.setMap(this.map);
  }
  
  return Map;
})();
