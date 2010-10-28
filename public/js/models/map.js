function Map(options) {
  var self = this;
  self.id = Utils.guid();
  self.dom = options.dom;
  self.controllable = options.controllable;
  self.showCredits = options.showCredits;

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

  // Create Overlay to capture XY Position
  this.overlay = new google.maps.OverlayView();
  this.overlay.draw = function() {};
  this.overlay.onRemove = function() {};
  this.overlay.setMap(this.gmap);

  // Clean the exesive gmaps credits.
  if (!self.showCredits)
    setTimeout(function() {
      console.log('cleaning up credits!');
      $('a[target="_blank"]', self.dom).parent().detach();
  }, 800);
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
  if (this.locked) {
    this.lastMove = pos;
    return;
  }

  this.gmap.panTo(new google.maps.LatLng(pos.lat, pos.lng));
  this.gmap.setZoom(pos.zoom);
}

Map.prototype.onClick = function(callback) {
  var self = this;
   google.maps.event.addListener(self.gmap, 'click', function() {
    callback();
  });
}

Map.prototype.lock = function() {
  this.locked = true;

  this.gmap.setOptions({
    navigationControl: false
  });

}

Map.prototype.unlock = function() {
  this.locked = false;
  if (this.lastMove) {
    this.moveTo(this.lastMove);
    delete this.lastMove;
  }

  this.gmap.setOptions({
    navigationControl: true
  });
}

Map.prototype.getXYPosition = function(x, y) {
  var location = this.overlay
    .getProjection()
    .fromContainerPixelToLatLng(new google.maps.Point(x, y));

  return {
    latitude:  location.lat()
  , longitude: location.lng()
  }
}
