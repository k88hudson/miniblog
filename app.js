var express = require( "express" ),
    marked = require( "marked" ),
    fs = require( "fs" ),
    app = express();

// Directories, etc.
var PUBLIC_DIR = __dirname + "/public",
    VIEWS_DIR = __dirname + "/views",
    DATA_DIR = __dirname + "/data",
    PORT = 9090;

// Middleware
app.configure( function() {
  app.use( app.router );
  app.use( express.static( PUBLIC_DIR ) );
  app.use( express.errorHandler() );
});

// Views
app.set( "views", VIEWS_DIR );
app.set("view options", {
  layout: false
});
app.set( "view engine", "jade" );

// Data
var postsData = require( DATA_DIR + "/posts.json" ),
    siteData = require( DATA_DIR + "/site.json" );

function updateManifest() {
  var data = JSON.stringify( postsData, null, 2 );
  fs.writeFileSync( DATA_DIR + "/posts.json", data, "utf-8" );
}

function addPost() {

}

function removePost( id ) {
  delete postsData[ id ];
  updateManifest();
  console.log( "removed " + id );
}

function modifyPost() {

}

function sortByDate( obj, ascDesc ) {
  var item,
      results = [],
      order = 1;

  if ( ascDesc === "asc" ) {
    order = -1;
  }

  // Make array
  for ( item in obj ) {
    if ( obj.hasOwnProperty( item ) ) {
      results.push( item );
    }
  }

  // Sort it
  results = results.sort( function( a, b ) {
    var dateA = new Date( obj[ a ].date ),
        dateB = new Date( obj[ b ].date );

    if ( dateA > dateB ) return -1 * order;
    if ( dateA < dateB ) return 1 * order;
    return 0;
  });

  return results;
}

function getContent( data, res ) {
  var path,
      postTotal;

  if ( !data ) {
    res.send( "Sorry, that doesn't appear to be a post." );
    return;
  }

  path = data.path;

  try {
    postTotal = fs.readFileSync( path, "utf-8" );
  } catch( e ) {
    removePost( data.id );

    res.send( "Sorry, there seemed to be a file missing at that id." );
    return;
  }
  var postContent = postTotal.split( "!!! CONTENT" )[ 1 ].split( "!!! SCRIPTS" )[ 0 ],
      postMarked = postContent.match( /<mark>[\s\S]*?<\/mark>/gm ),
      postScripts = postTotal.split( "!!! CONTENT" )[ 1 ].split( "!!! SCRIPTS" )[ 1 ];

  //Convert postContent to html
  if ( postMarked ) {
    for ( var i=0, item; item = postMarked[ i ]; i++ ) {
      postContent = postContent.replace( item, marked( item.slice( 6, -7 ) ) );
    }
  }

  return {
    html: postContent,
    scripts: postScripts
  };

}

// Add the latest Post
var sortedPosts = sortByDate( postsData );

siteData.latestPost = postsData[ sortedPosts[ 0 ] ];


// All - Home
app.get( "/", function( req, res ) {
  var allPosts = [];

  sortedPosts.forEach( function( id, index ) {
    var _postData;

    if ( id ) {
      _postData = postsData[ id ];
      _postData.id = id;
      _postData.content = getContent( _postData, res ).html;
      allPosts[ index ] = _postData;
    }

  });

  res.render( "layouts/all", {
    view: "home",
    path: "..",
    site: siteData,
    posts: allPosts
  });
});


// Posts
app.get( "/posts", function( req, res ) {
  var allPosts = [];

  sortedPosts.forEach( function( id, index ) {
    var _postData;

    if ( id ) {
      _postData = postsData[ id ];
      _postData.id = id;
      _postData.content = getContent( _postData, res ).html;
      allPosts[ index ] = _postData;
    }

  });

  res.render( "layouts/list", {
    view: "posts",
    path: "..",
    site: siteData,
    posts: allPosts
  });
});

// Post
app.get( "/post/:id", function( req, res ) {
  var id = req.route.params.id,
      postData = postsData[ id ],
      postContent;

  if( !postData ) {
    res.send( "Sorry, there was no post by the name." );
  }

  postContent = getContent( postData, res );

  if ( postData ) {
    res.render( "layouts/single", {
      view: "post",
      path: "../..",
      site: siteData,
      post: postData,
      content: postContent.html,
      scripts: postContent.scripts
    });
  } else {
    res.send( "Oops, no post by that name." );
  }
});

// Ok, go.
app.listen( PORT );
console.log( "Listening on port " + PORT );
