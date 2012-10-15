Title: Transitions in Transition
Date: 2012-08-11
Summary: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.

!!! CONTENT

### Display
Many of our early popcorn plugins hide and show elements by changing the the `display` property of the container element to `none` v.s. `inline`/`block` in javascript. 

This works well to hide the element from pointer events, but unfortunately, `display` is not one of the [properties supported by CSS3 transitions](http://www.w3.org/TR/css3-transitions/#animatable-properties).

<div class="specimen">
  <h4>Figure 1. Hello world</h4>
  <div class="container">
    <div class="mini-video">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in repreheur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </div>
    <div class="play-button"></div>
    <div id="test0-eg" class="event fade">Hello world</div>
  </div>
  <p><button id="test0">Try me</button></p>
</div>

```javascript
// Off
document.getElementById( "myDiv" ).style.display = "none";

// On
document.getElementById( "myDiv" ).style.display = "block";
```
```css
#myDiv {
  -webkit-transition: opacity 1s linear;
  -moz-transition: opacity 1s linear;
  -o-transition: opacity 1s linear;
  transition: opacity 1s linear;
}
```

### Getting classy
Since we're going to rely on CSS3 transitions anyway, we're going to change the way we handle visible/hidden states. Instead of actually setting inline styles with `element.style`, we will include all styling inside CSS classes and use javascript only to handle a state change.

By state change, all I mean is adding and removing classes.

```css
 .fade {
    opacity: 1;
    transition: opacity 1s linear;
  }
  
  .fade.off {
    opacity: 0;
  }
```

<div class="specimen">
  <h4>Figure 2. Hello world</h4>
  <div class="container">
    <div class="mini-video">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in repreheur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </div>
    <div class="play-button"></div>
    <div id="test1-eg" class="event fade">Hello world</div>
  </div>
  <p><button id="test1">Try me</button></p>
</div>

```css
 .fade {
    opacity: 1;
    transition: opacity 1s linear;
  }
  .fade.off {
    opacity: 0;
  }
```

<div class="grid-box">
  <div class="grid-row">
    <div class="grid-3">
      Javascript
  <pre>
$( ".myDiv" ).fadeIn();
  </pre>
    </div>
    <div class="grid-3">
      CSS
  <pre>
.myDiv {
  -webkit-transition: opacity 0.2s ease;
  -moz-transition: opacity 0.2s ease;
  -o-transition: opacity 0.2s ease;
  transition: opacity 0.2s ease;
}
  </pre>
    </div>
  </div>
</div>

This works with [the following items](http://www.w3.org/TR/2009/WD-css3-transitions-20091201/#animatable-properties-).

- __background__-color, -image*, -position
- __border__ -color, -width, -spacing
- __left__, right, top, bottom
- __height__, width, max-height, max-width
- __margin__, padding
- __color__, font-size, font-weight, letter-spacing, line-height, text-indent, text-shadow, word-spacing
- __opacity__, visibility
- __outline__ -color, -width, -offset
- __vertical-align__
- __z-index__
- __zoom__
- __crop__
- __grid-__


## Resources

- Microsoft Reference: http://msdn.microsoft.com/en-us/library/ie/hh673535%28v=vs.85%29.aspx
- MDN: Using CSS Transitions: https://developer.mozilla.org/en-US/docs/CSS/Using_CSS_transitions?redirectlocale=en-US&redirectslug=CSS%2FCSS_transitions
- 

!!! SCRIPTS
<style>
  .container {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
  .mini-video {
    background: #EEE;
    padding: 20px;
    line-height: 1.1;
  }
  .play-button {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -40px;
    margin-top: -60px;
    background: black;
    color: #EEE;
    text-align: center;
    border-radius: 40px;
    cursor: pointer;
  }
  .event {
    position: absolute;
    top: 30px;
    left: 40px;
    height: 100px;
    width: 185px;
    color: #FFF;
    background: rgba( 71, 162, 218, 0.9 );
  }

   /* TEST 1 */
  #test0-eg.fade {
    opacity: 1;
    display: block;
    -webkit-transition: opacity 1s linear;
    -moz-transition: opacity 1s linear;
    -o-transition: opacity 1s linear;
    transition: opacity 1s linear;
  }
  #test0-eg.fade.off {
    opacity: 0;
    display: none;
  }

  /* TEST 1 */
  #test1-eg.fade {
    opacity: 1;
    -webkit-transition: opacity 1s linear;
    -moz-transition: opacity 1s linear;
    -o-transition: opacity 1s linear;
    transition: opacity 1s linear;
  }
  #test1-eg.fade.off {
    opacity: 0;
  }

   /* TEST 2 */
  #test2-eg.fade {
    opacity: 1;
    -webkit-transition: opacity 1s linear;
    -moz-transition: opacity 1s linear;
    -o-transition: opacity 1s linear;
    transition: opacity 1s linear;
  }
  #test2-eg.fade.off {
    opacity: 0;
    display: none;
  }

</style>
<script>

document.getElementById( "test0" ).addEventListener( "click", function( e ) {
  document.getElementById( "test0-eg" ).classList.toggle( "off" );
}, false);

// Example 1
document.getElementById( "test1" ).addEventListener( "click", function( e ) {
  document.getElementById( "test1-eg" ).classList.toggle( "off" );
}, false);

// Example 2
document.getElementById( "test2" ).addEventListener( "click", function( e ) {
  var el = document.getElementById( "test2-eg" );
  if ( el.classList.contains( "off" ) ) {
    el.classList.remove( "off" );
  } else {
    el.classList.add( "off" );
    el.classList.add( "_delay" );
  }
  
}, false );

function displayNone( e ) {
  var _this = e.srcElement;
  if ( _this.classList.contains( "off" ) ) {
    _this.classList.remove( "_delay" );
  }
}

document.getElementById(  "test2-eg").addEventListener( "webkitTransitionEnd", displayNone, false );
document.getElementById( "test2-eg" ).addEventListener( "onwebkittransitionend", displayNone, false );
document.getElementById( "test2-eg" ).addEventListener( "ontransitionend", displayNone, false );
document.getElementById( "test2-eg" ).addEventListener( "oTransitionEnd", displayNone, false );

// Example 3
document.getElementById( "test3" ).addEventListener( "click", function( e ) {
  document.getElementById( "test3-eg" ).classList.toggle( "off-alt" );
}, false);

// Example 4
document.getElementById( "test4" ).addEventListener( "click", function( e ) {
  document.getElementById( "test4-eg" ).classList.toggle( "off-alt" );
}, false);

// Click me
var playButtons = document.querySelectorAll( ".play-button" );
for( var i = 0; i < playButtons.length; i++ ) {
  playButtons[ i ].addEventListener( "click", function( e ) {
    console.log( e );
    this.classList.toggle( "red" );
  }, false);
}


</script>
