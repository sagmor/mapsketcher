function MapSketcher(options) {
  if (! (this instanceof arguments.callee)) {
    return new arguments.callee(arguments);
  }

 var self = this;

 self.settings = {
  port: options.port
 };

}

module.exports = MapSketcher;
