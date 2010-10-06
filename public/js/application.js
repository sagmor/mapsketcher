var mapSketcherClient;
jQuery(function() {
  jQuery.getJSON('/config.json', function(config) {
    config.hostname = window.location.hostname
    mapSketcherClient = new MapSketcherClient(config);
    mapSketcherClient.launch();
  })
});
