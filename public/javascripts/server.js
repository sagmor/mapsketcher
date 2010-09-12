var Server = (function(){
  var Server = function(key) {
    this.pusher = new Pusher(key, 'mapsketcher');
    this.pusher.subscribe('mapsketcher');
  }
  
  Server.prototype.setMap = setProperty('map');
  Server.prototype.setObjects = setProperty('objects');
  
  Server.prototype.start = function() {
    server = this;
    this.pusher.bind('create', function(data) {
      var sketch = new Sketch(data);
      server.objects.add(sketch);
    })
  }
  
  return Server;
})();
