var getProperty = function(x) { return function() { return this[x] } }
var setProperty = function(x) { return function(v) { this[x] = v } }

$(document).ready(function() {

  var objects = new Objects("#objects");
  
  objects.setMap( new Map( "#map", objects ) );
  objects.setMinimap( new Minimap( "#minimap", objects.getMap() ));

  objects.start();
  
  var server = new Server(PUSHER_KEY);
  server.objects = objects;
  server.map = objects.map;
  
  server.start();
});