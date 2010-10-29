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

  $('#collaborativeRoomSelection form .cancel').click(function(e) {
    $('.close').click();
    return e.preventDefault();
  });
  
  $('#collaborativeRoomSelection form').submit(function(e) {
    $('.close').click();
    
    mapSketcherClient.joinColaborativeRoom(this.name.value);

    return e.preventDefault();
  });

   $('#feedback').githubVoice('sagmor', 'mapsketcher');
   $('#personal').touchScrollable();
});
