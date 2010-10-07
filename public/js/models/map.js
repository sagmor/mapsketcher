function Map(options) {
  var self = this;
  self.dom = options.dom;
  self.controllable = options.controllable;

  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions =
  { zoom: 8
  , center: latlng
  , mapTypeId: google.maps.MapTypeId.ROADMAP
  , mapTypeControl: false
  };

  if (!self.controllable) {
    mapOptions.disableDoubleClickZoom = true;
    mapOptions.disableDefaultUI = true;
    mapOptions.draggable = false;
  } else {
    mapOptions.navigationControlOptions = {
      style: google.maps.NavigationControlStyle.SMALL
    }
  }

  self.gmap = new google.maps.Map(self.dom,
    mapOptions);

  if (options.position)
    self.moveTo(options.position);

  google.maps.event.addListener(self.gmap, 'dragstart', function() {
    self.userMove = true;
  });
  google.maps.event.addListener(self.gmap, 'dragend', function() {
    self.userMove = false;
  });
}

Map.prototype.onMove = function(callback) {
  var self = this;
  
  google.maps.event.addListener(self.gmap, 'center_changed', function() {
    if (self.userMove)
      callback(self.getPosition());
  });
  
  google.maps.event.addListener(self.gmap, 'zoom_changed', function() {
    if (self.userMove)
      callback(self.getPosition());
  });
}

Map.prototype.getPosition = function() {
  var center = this.gmap.getCenter();

  return {
    lat: center.lat()
  , lng: center.lng()
  , zoom: this.gmap.getZoom()
  };
}

Map.prototype.moveTo = function(pos) {
  this.gmap.panTo(new google.maps.LatLng(pos.lat, pos.lng));
  this.gmap.setZoom(pos.zoom);
}

Map.prototype.onClick = function(callback) {
  var self = this;
   google.maps.event.addListener(self.gmap, 'click', function() {
    callback();
  });
}
