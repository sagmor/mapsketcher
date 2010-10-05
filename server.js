require.paths.unshift("./vendor");
require.paths.unshift("./lib");

process.addListener('uncaughtException', function (err, stack) {
  console.log('------------------------');
  console.log('Exception: ' + err);
  console.log(err.stack);
  console.log('------------------------');
});

var MapSketcher = require('map_sketcher');

new MapSketcher({
  port: 8080
});
