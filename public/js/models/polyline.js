function Polyline(data, sketch, options) {
  var self = this;
  if(data) {
    self.points = data.points;
    self.color = data.color; 
  } else {
    self.points = [];
    self.color = "#FF0000"; 
  }
  
  if (sketch) {
    self.sketch = sketch;
    $(self.sketch).bind('delete', function() {
      self.onSketchDelete();
    })
  }

  this.options = options || {};
}

Polyline.prototype.onSketchDelete = function() {
  if(self.gpolyline) {
    self.gpolyline.setMap(null);
  }
}

Polyline.prototype.addPoint = function(position) {
  var self = this;
  self.points.push(position);
  if(self.gpolyline) {
    setTimeout(function() {
      var map = self.gpolyline.getMap();
      var oldGPolyline = self.gpolyline;
      self.gpolyline = self.to_gpolyline();
      self.gpolyline.setMap(map);
      setTimeout(function() {
        oldGPolyline.setMap(null);
      }, 0.1);
    },0);
  }
} 

Polyline.prototype.to_gpolyline = function() {
  var self = this;
  var gpolyline = new google.maps.Polyline({
    path: _.map(self.points, Polyline.posToGPoint)
  , strokeColor: self.color
  , strokeOpacity: 1.0
  , strokeWeight: 4 
  });

  if (self.options.click) {
    google.maps.event.addListener(gpolyline, 'click', function() {
      self.options.click.call(self.sketch, self);
    });
      
  }

  return gpolyline;
} 

Polyline.posToGPoint = function(pos) {
  return new google.maps.LatLng(pos.latitude, pos.longitude);
}

Polyline.prototype.setMap = function(map) {
  if(!this.gpolyline) this.gpolyline = this.to_gpolyline();
  this.gpolyline.setMap( map && map.gmap);
} 

Polyline.prototype.to_json = function() {
  return {
    color: this.color
  , points: this.points
  };
}
