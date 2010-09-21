var Sketch = (function(){
  var Sketch = function(data) {
    if (data) {
      this.id = data.id;
      this.points = data.points || [];
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.new_record = false;
    } else {
      this.id = '' + new Date().getTime();
      this.points = [];
      this.new_record = true;
    }
  }
  
  Sketch.prototype.id = getProperty('id');
  
  Sketch.prototype.append = function(latitude, longitude) {
    this.points.push({
      latitude: latitude,
      longitude: longitude,
      position: this.points.length
    });
  }
  
  Sketch.prototype.save = function(objects) {
    if (!this.new_record || this.points.length < 2) return;
    
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
        objects.remove(this);
        
        var saved_sketch = new Sketch(data);
        objects.add(saved_sketch);
      }
    }); 
  }
  
  Sketch.prototype.polyline = function() {
    var ordered_points = this.points;
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
