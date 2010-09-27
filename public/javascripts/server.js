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
    });
    
    this.pusher.bind('go_to', function(data) {
      server.map.go_to(data);
    });

    this.pusher.bind('delete', function(id) {
      s = new Sketch();
      s.id = id;
      server.objects.remove(s);
    });
  }
  
  return Server;
})();
