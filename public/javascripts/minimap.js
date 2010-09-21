var Minimap = (function(){
  
  var Minimap = function(selector, map) {
    this.selector = selector;
    this.map = map;
    this.polylines = {};
    
    var dom = $(selector);
    
    var minimap = this.minimap = new google.maps.Map(dom[0], {
      zoom: 11,
      center: new google.maps.LatLng(-33.457788,-70.664105),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      draggable: false,
      disableDoubleClickZoom: true
    });
    
    google.maps.event.addListener(this.map.map, 'center_changed', function() {
      minimap.panTo(this.getCenter());
    });

    google.maps.event.addListener(this.minimap, 'dblclick', this.onDblclick);
    
    setTimeout(function() {
      dom.children().children().each(function() {
        if ( $('a[target="_blank"]', this).length ) $(this).detach();
       });
    }, 1000);
  }

  Minimap.prototype.onDblclick = function(event) {
    jQuery.ajax({
      url: '/go_to',
      data: {
        latitude: event.latLng.lat(),
        longitude: event.latLng.lng()
      },
      type: 'POST'
    });
  }
  
  Minimap.prototype.draw = function(sketch) {
    var polyline = sketch.polyline();
    this.polylines[sketch._id] = polyline;
    polyline.setMap(this.minimap);
  }
  
  Minimap.prototype.undraw = function(sketch) {
    if (this.polylines[sketch._id]) {
      this.polylines[sketch._id] = null;
    }
  }
  
  
  return Minimap;
})();
