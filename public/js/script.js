document.addEventListener( "DOMContentLoaded", function(){
  
  var HEADER_HEIGHT = 40,
      view = document.body.className.replace( "view-", "" );

  // Scroll stuff
  window.addEventListener( "scroll", function( e ){
    var scrollTop = window.scrollY,
        RATIO = 1;

    if ( scrollTop < HEADER_HEIGHT / RATIO ) {
      document.body.classList.remove( "pinned" );
    } else if ( scrollTop >= HEADER_HEIGHT / RATIO ) {
      document.body.classList.add( "pinned" );
    }
  }, false );

  // Link - add active
  function activeNavigation() {
    var header = document.getElementById( "header" ),
        oldActive = header.querySelectorAll( ".active" ),
        activeEl = header.querySelector( "." + view ),
        i;
    
    for ( i = 0; i < oldActive.length; i++ ) {
      oldActive[ i ].classList.remove( "active" );
    }

    activeEl.classList.add( "active" );

  }

  activeNavigation();
  


}, false);

