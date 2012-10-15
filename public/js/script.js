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

    if( activeEl ) {
      activeEl.classList.add( "active" );
    }

  }

  function enableDrawing( img ) {
    // Mostly copied from demo by Loktar, found at http://jsfiddle.net/loktar/dQppK/23/
    var canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    painting = false,
    lastX = 0,
    lastY = 0,
    lineThickness = 1;

    canvas.width = img.getBoundingClientRect().width;
    canvas.height = img.getBoundingClientRect().height;

    canvas.onmousedown = function(e) {
        painting = true;
        ctx.fillStyle = "#F70028";
        lastX = e.clientX - this.getBoundingClientRect().left;
        lastY = e.clientY - this.getBoundingClientRect().top;
        console.log( e, lastX, lastY );
    };

    canvas.onmouseup = function(e){
        painting = false;

    };

    canvas.onmousemove = function(e) {
        e.stopPropagation();
        if (painting) {
            mouseX = e.clientX - this.getBoundingClientRect().left;
            mouseY = e.clientY - this.getBoundingClientRect().top;

            // find all points between
            var x1 = mouseX,
                x2 = lastX,
                y1 = mouseY,
                y2 = lastY,
                x, dx, y;

            var steep = (Math.abs(y2 - y1) > Math.abs(x2 - x1));
            if (steep){
                x = x1;
                x1 = y1;
                y1 = x;

                y = y2;
                y2 = x2;
                x2 = y;
            }
            if (x1 > x2) {
                x = x1;
                x1 = x2;
                x2 = x;

                y = y1;
                y1 = y2;
                y2 = y;
            }
                dx = x2 - x1,
                dy = Math.abs(y2 - y1),
                error = 0,
                de = dy / dx,
                yStep = -1,
                y = y1;

            if (y1 < y2) {
                yStep = 1;
            }

            lineThickness = 5 - Math.sqrt((x2 - x1) *(x2-x1) + (y2 - y1) * (y2-y1))/10;
            if(lineThickness < 1){
                lineThickness = 1;
            }

            for ( x = x1; x < x2; x++ ) {
                if (steep) {
                    ctx.fillRect(y, x, lineThickness , lineThickness );
                } else {
                    ctx.fillRect(x, y, lineThickness , lineThickness );
                }

                error += de;
                if (error >= 0.5) {
                    y += yStep;
                    error -= 1.0;
                }
            }
            lastX = mouseX;
            lastY = mouseY;
        }
    };
    img.parentNode.insertBefore( canvas, img );
  }

  function activateAnnotations() {
    var allLinks = document.querySelectorAll( "figure a" ),
        i, el;

    function showAnnotation( e ) {
      e.preventDefault();
      document.querySelector( ".annotations" ).innerHTML = this.href;
      document.body.classList.toggle( "annotations-on" );
    }

    for ( i = 0; el = allLinks[ i ]; i++ ) {
      el.addEventListener( "click", showAnnotation, false );
    }

  }

  // INIT ---------------
  //activeNavigation();

  function activateEditing( imgs ) {
    return function() {
      for( var i = 0, l = imgs.length; i < l; i++ ) {
        enableDrawing( imgs[ i ].parentNode );
      }
    };
  }
  var figures = document.querySelectorAll( "figure" );

  for ( var i=0, item; item = figures[ i ]; i++ ) {
    var editButton = document.createElement( "a" ),
        imgs = item.querySelectorAll( "img" );
    editButton.innerHTML = "Edit";
    editButton.addEventListener( "click", activateEditing( imgs ), false );
    item.querySelector( "figcaption" ).appendChild( editButton );
  }


}, false);

