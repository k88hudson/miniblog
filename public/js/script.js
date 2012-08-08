document.addEventListener( "DOMContentLoaded", function(){
  
  var HEADER_HEIGHT = 40;
  //SCROLL STUFF
  
  window.addEventListener( "scroll", function( e ){
    var scrollTop = window.scrollY,
        RATIO = 1;

    if ( scrollTop < HEADER_HEIGHT / RATIO ) {
      document.body.classList.remove( "pinned" );
    } else if ( scrollTop >= HEADER_HEIGHT / RATIO ) {
      document.body.classList.add( "pinned" );
    }
  }, false );

}, false);

