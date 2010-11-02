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
    , onLoad: function() {
        $('#name').focus();
      }
    , onClose: function() {
        $('#workspace').focus();
      }
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

  $(function() {  
    $("#collaborativeRoomSelection form input").keypress(function (e) {  
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {  
           $('#collaborativeRoomSelection form').submit();
            return false;  
        } else {  
            return true;  
        }  
    });  
  });
  


   $('#feedback').githubVoice('sagmor', 'mapsketcher');
   $('#personal').touchScrollable();




});
