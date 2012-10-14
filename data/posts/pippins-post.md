Title: Testing figure styles
Date: 2012-10-13
Summary: Last weekend the Popcorn team conducted a user testing session at the Toronto office to uncover problem areas in our interface and gage user reactions. We learned a lot.

!!! CONTENT

### Finding the right users
In the last couple of months Popcorn Maker's roadmap changed considerably in order to accomodate a particular kind of user &ndash; a web "remixer" who participates in the culture of sharing and opinion for web video but who has not yet made the leap to content creation.

Long-term we imagine Popcorn Maker's editing system will be useful for everything from professional filmaking to early education &ndash; but for now, we are focusing on a particular set of expectations from our users, and a goal of converting those users into content creator given the right tools.

I specifically selected participants who were familiar with web video but who did not generate video content or write code. They 

<div class="specimen-image">
  <figure>
    <!-- ![Screenshot](http://dl.dropbox.com/u/29163874/Screenshots/59.png)-->
    ![Screenshot](http://dl.dropbox.com/u/29163874/Screenshots/5a.png)
  </figure>
  <div class="specimen">
    <h4>Figure 1. Hello world</h4>
    <ol>
      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in repreheur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
    </ol>
  </div>
</div>

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
      jQuery
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
