function Polyline(data) {
  if(data) {
    this.points = data.points;
    this.color = data.color; 
  } else {
    this.points = [];
    this.color = "#FF0000"; 
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
  return new google.maps.Polyline({
    path: _.map(this.points, Polyline.posToGPoint)
  , strokeColor: this.color
  , strokeOpacity: 1.0
  , strokeWeight: 2 
  });
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
