function Sketch(data) {
  if(data)
    this.polylines = data.polylines;
  else
    this.polylines = [];
}

Sketch.prototype.addPolyline = function(polyline) {
  this.polylines.push(polyline.to_json());
}

Sketch.prototype.to_json = function() {
  return {
    polylines: this.polylines
  }
}

Sketch.prototype.drawAt = function(map) {
  var objects = _.map(this.polylines, function(o) { return new Polyline(o) });
  _.each(objects, function(o) { o.setMap(map) });
}
