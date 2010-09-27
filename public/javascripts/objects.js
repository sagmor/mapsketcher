var Objects = (function(){
  var Objects = function(selector) {
    this.sketches = {};
  }

  var tpl = _.template(
    '<div id="sketch-<%= id %>" class="sketch">' +
    '<div class="thumbnail"></div>' +
    '<span class="date">' +
    '<%= address %>' +
    '</span>' +
    '<span class="actions">' +
    '<a class="goto">&nbsp;</a>' +
    '<a class="destroy">&nbsp;</a>' +
    '</span>' +
    '</div>');
  
  Objects.prototype.setMap = setProperty('map');
  Objects.prototype.setMinimap = setProperty('minimap');
  
  Objects.prototype.getMap = getProperty('map');
  Objects.prototype.getMinimap = getProperty('minimap');
  
  Objects.prototype.start = function() {
    var _this = this;
    jQuery.getJSON('/sketches.json', function(data) {
      _.each(data, function(sketch) {
        _this.add(new Sketch(sketch));
      });
    });
  }

  Objects.prototype.add = function(sketch) {
    if (this.sketches[sketch.id]) return;
    
    this.sketches[sketch.id] = sketch;
    this.map.draw(sketch);
    this.minimap.draw(sketch);

    var _this = this;
    var obj = $(tpl(sketch));
    $('a.goto', obj).click(function() {
      _this.map.go_to(sketch);
      return false;
    });
    $('a.destroy', obj).click(function() {
      // _this.remove(sketch);
      $(this).toggle();
      $.ajax({
        url: '/sketches/' + sketch.id + '.json',
        type: 'DELETE'
      });
      return false;
    });
    obj.prependTo('#objects');
    

    var thumbnail = new google.maps.Map($('.thumbnail', obj)[0], {
      // center: new google.maps.LatLng(21.291982, -157.821856),
      disableDefaultUI: true,
      disableDoubleClickZoom: true,
      draggable: false,
    });
    sketch.polyline().setMap(thumbnail);
    thumbnail.fitBounds(sketch.bounds());

    setTimeout(function() {
      thumbnail.setZoom(thumbnail.getZoom() + 5);
    }, 300);
    
  }
  
  Objects.prototype.remove = function(sketch) {
    if (!this.sketches[sketch.id]) return;
    
    this.sketches[sketch.id] = null;
    this.map.undraw(sketch);
    this.minimap.undraw(sketch);
    $('#sketch-'+sketch.id).detach();
  }
  
  return Objects;
})();
