Title: State of Transitions
Date: 2012-08-11
Summary: CSS, javascript, all kinds of transitions. We're not in Kansas anymore. Unlike the other Markdown MediaWiki extensions, this one behaves exactly like the other tools here: all the syntax works. The downside is that MediaWiki will not parse the document so it will not count links to other pages or generate a "Table of Contents" for you.

!!! CONTENT
## Make it simple
Javacript is all the rage
<style>
 .myDiv {
    color: red;
    -webkit-transition: opacity 0.2s ease;
    -moz-transition: opacity 0.2s ease;
    -o-transition: opacity 0.2s ease;
    transition: opacity 0.2s ease;
  }
</style>
<div class="myDiv">Hello world</div>


### Javascript
```javascript
  $( ".myDiv" ).fadeIn();
```

### CSS3
```css
  .myDiv {
    -webkit-transition: opacity 0.2s ease;
    -moz-transition: opacity 0.2s ease;
    -o-transition: opacity 0.2s ease;
    transition: opacity 0.2s ease;
  }
```
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

This is more text
