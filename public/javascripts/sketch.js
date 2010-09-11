var Sketch = (function(){
  var Sketch = function(data) {
    if (data) {
      this._id = data._id;
      this.points = data.points || [];
      this.latitude = data.latitude;
      this.longitude = data.longitude;
    } else {
      this.points = [];
    }
  }
  
  Sketch.prototype.append = function(latitude, longitude) {
    this.points.push({
      latitude: latitude,
      longitude: longitude,
      position: this.points.length
    });
  }
  
  Sketch.prototype.save = function(objects) {
    if (this.points.length < 2) return;
    
    objects.add(this);
    
    jQuery.ajax({
      url: '/sketches.json',
      data: {
        sketch: {
          points: this.points
        }
      },
      type: 'POST',
      success: function(data) {
        console.log(data);
        // TODO
      }
    }); 
  }
  
  Sketch.prototype.polyline = function() {
    var ordered_points = _.sortBy(this.points, getProperty('position'))
    var path = _.map(ordered_points, function(x) { 
      return new google.maps.LatLng(x.latitude, x.longitude)
    });
      
    return new google.maps.Polyline({
      path: path,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
  }
    
  return Sketch;
})();
