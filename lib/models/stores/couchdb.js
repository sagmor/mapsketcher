var sys     = require('sys')
,   couchdb = require('couchdb')
,   client  = couchdb.createClient(5984, 'localhost')
,   db      = client.db('mapsketcher')
;

(function() {
  db.exists(function(err,ok) { if (!ok) db.create(); });
})();

var ROOM_REGEXP = /^\/room\/([a-zA-Z0-9_-]+)\/sketches$/;

function getSketches(room, callback) {
  db.getDoc(room, function(err, sketches) {
    callback(sketches || { sketches: [] });
  });
}

var listener = {
  incoming: function(message, callback) {
    var match;
    if (match = ROOM_REGEXP.exec(message.channel)) {
      var room = match[1];
      db.getDoc(room, function(err, doc) {
        doc = doc || { sketches: [] };
        doc.sketches.push(message.data);
        db.saveDoc(room, doc);
      });
    }

    callback(message);      
  }
};

module.exports = {
  get: getSketches
, listener: listener 
};
