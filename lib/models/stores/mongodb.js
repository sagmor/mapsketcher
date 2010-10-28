var sys     = require('sys')
,   mongodb = require('mongodb')
,   db      = new mongodb.Db('mapsketcher', new mongodb.Server("127.0.0.1", 27017, {}))
;
db.open(function(){});

var ROOM_REGEXP = /^\/room\/([a-zA-Z0-9_-]+)\/sketches$/;

function getSketches(room, callback) {
  db.collection(room, function(err, collection) {
    collection.find(function(err, cursor) {
      cursor.toArray(function(err, results) {
        callback({ sketches: results });
      });
    });
  });
}

var listener = {
  incoming: function(message, callback) {
    callback(message);      

    var match;
    if (match = ROOM_REGEXP.exec(message.channel)) {
      var room = match[1];

      // Save the sketch
      switch(message.data.type) {
        case 'new':
          db.collection(room, function(err, collection) {
            collection.insert(message.data);
          });
          break;
      }
    }
  }
};

module.exports = {
  get: getSketches
, listener: listener 
};
