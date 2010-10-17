var mapSketcherClient;
jQuery(function() {
  jQuery.getJSON('/config.json', function(config) {
    config.hostname = window.location.hostname
    mapSketcherClient = new MapSketcherClient(config);
    mapSketcherClient.launch();
  });

  $("a[rel]").overlay({
	  mask: {
		  color: '#ebecff'
		, loadSpeed: 200
		, opacity: 0.9
    }
  });

  $('#collaborativeRoomSelection form').submit(function(e) {
    $('.close').click();

    // TODO: Load Room

    return e.preventDefault();
  });
});
