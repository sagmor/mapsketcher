var http = require('http');
var tileStore = 'cache/tiles';
var source = http.createClient(80, 'tile.openstreetmap.org');

var downloading = {};

function getTile(client,position) {

  
  downloadTile(position, function (response) {

    client.writeHead(response.statusCode, response.headers);

    response.on('data', function (chunk) {
      client.write(chunk);
    });

    response.on('end', function() { client.end(); });
  });

  
}


function downloadTile(position, callback) {

  // Hack to adapt to OSM tile positioning:w
  var X = position.x % (1 << position.zoom);
  var url = '/'+position.zoom + '/' + X + '/' + position.y +'.png';

  console.log("Requesting: "+url)

  var request = source.request('GET', url);
  request.end();

  request.on('response', callback);
}



module.exports = {
  get: getTile
};
