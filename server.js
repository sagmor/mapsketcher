require.paths.unshift(__dirname + "/vendor");
require.paths.unshift(__dirname + "/lib");

process.addListener('uncaughtException', function (err, stack) {
  console.log('------------------------');
  console.log('Exception: ' + err);
  console.log(err.stack);
  console.log('------------------------');
});

var MapSketcher = require('map_sketcher');

new MapSketcher({
  port: 8000
});
