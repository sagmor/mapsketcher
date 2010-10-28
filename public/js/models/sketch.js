function Sketch(data) {
  if(data) {
    this.id = data.id;
    this.polylines = data.polylines;
  } else {
    this.id = Utils.guid();
    this.polylines = [];
  }

  this.drawPool = {};
}

Sketch.prototype.addPolyline = function(polyline) {
  this.polylines.push(polyline.to_json());
}

Sketch.prototype.to_json = function() {
  return {
    id: this.id
  , polylines: this.polylines
  }
}

Sketch.prototype.destroy = function() {
  var self = this;
  _.each(this.drawPool, function(polylines, map_id) {
    self.unDrawFrom(map_id);
  });
}

Sketch.prototype.drawAt = function(map, options) {
  // var objects = this.drawPool[map] || this.drawPool[map] = this.polylinesObjects(options);
  var objects = this.polylinesObjects(options);
  var objects = map.id in this.drawPool ? this.drawPool[map.id] : this.drawPool[map.id] = this.polylinesObjects(options);
  _.each(objects, function(o) { o.setMap(map) });
}


Sketch.prototype.unDrawFrom = function(map_id) {
  var polylines = this.drawPool[map_id];

  if (polylines) {
     _.each(polylines, function(p) { p.setMap(null) });
    delete this.drawPool[map_id]
  }
}

Sketch.prototype.polylinesObjects = function(options) {
  var self = this;
  return _.map(self.polylines, function(o) { return new Polyline(o, self, options) });
}

Sketch.prototype.bounds = function() {
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


}

Sketch.prototype.svgPathData = function() {
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
}
