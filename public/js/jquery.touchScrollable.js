(function( $ ){
  
  function mouseMove(event) {
    if (this.underTouchScrollable) {
      event.targetTouches = [event];
      touchMove.call(this, event);
    }
  }

  function touchStart(event) {
    this.lastScroll = null;
    this.scrolled = this.scrolled || 0;
  }
  
  function touchMove(event) {
    event.preventDefault();
		event.stopPropagation();
		
    var t = event.targetTouches[0];		
		
		//prepare needed variables
    if (this.lastScroll) {
      var delta = t.pageY - this.lastScroll;
      this.scrolled = this.scrolled + delta;

      if (this.scrolled > 10) this.scrolled = 10;

      $(this).children().css('-webkit-transform', "translate(0,"+ this.scrolled +"px)")
    }

    this.lastScroll = t.pageY;
  }

  function mouseDown(event) {
    this.underTouchScrollable = true;
    event.targetTouches = [event];
    touchStart.call(this, event);
  }

  function mouseUp(event) {
    this.underTouchScrollable = false;
  }


  $.fn.touchScrollable = function() {
  
    this.bind('mousemove', mouseMove);
    this.bind('touchmove', touchMove);
    this.bind('mousedown', mouseDown);
    this.bind('mouseup', mouseUp);
    this.bind('touchstart', touchStart);

  };
})( jQuery );

