var getProperty = function(x) { return function() { return this[x] } }
var setProperty = function(x) { return function(v) { this[x] = v } }
  
MapSketcher = {};

$(document).ready(function() {

  var objects = new Objects("#objects");
  MapSketcher.objects = objects;
  
  objects.setMap( new Map( "#map", objects ) );
  objects.setMinimap( new Minimap( "#minimap", objects.getMap() ));

  objects.start();
  
  var server = new Server(PUSHER_KEY);
  MapSketcher.server = server;
  server.objects = objects;
  server.map = objects.map;
  
  server.start();
});
