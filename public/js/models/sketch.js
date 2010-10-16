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

Sketch.prototype.bounds = _.memoize(function() {
  var self = this;

  _.reduce(this.polylines, function(bounds, polyline) {
    return _.reduce(polyline.points, function(bounds, point) {
      if (bounds.top < point.latitude) bounds.top = point.latitude;
      if (bounds.bottom > point.latitude) bounds.top = point.latitude;
      if (bounds.left < point.longitude) bounds.top = point.longitude;
      if (bounds.right > point.longitude) bounds.top = point.longitude;
    }, bounds);
  },
  { top:    this.polylines[0].points[0].latitude
  , bottom: this.polylines[0].points[0].latitude
  , left:   this.polylines[0].points[0].longitude
  , right:  this.polylines[0].points[0].longitude
  });


});

Sketch.prototype.svgPathData = _.memoize(function() {
  var self = this;
  var bounds = self.bounds();
  var pathData = "";

  function scale_position(pos) {
    // TODO
  }

  return _.reduce(self.polylines, function(fullPath, polyline) {
    var path = _.reduce(polyline.points, function(path, point) {
      var p = scale_position(point);
      return path + 'L' + p.x + ',' + p.y;
    }, '').substring(1);

    return fullPath + 'M' + path;
  }, '');
});
