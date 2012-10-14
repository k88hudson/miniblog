var express = require( "express" ),
    lessMiddleware = require( "less-middleware" ),
    marked = require( "marked" ),
    fs = require( "fs" ),
    app = express();

// Directories, etc.
var pub = __dirname + "/public",
    views = __dirname + "/views",
    dataDir = __dirname + "/data",
    PORT = 9090;

// Middleware
app.configure( function() {
  app.use( app.router );
  app.use(lessMiddleware({
    src: pub,
    compress: false
    }));
  app.use( express.static( pub ) );
  app.use( express.errorHandler() );
});

// Views
app.set( "views", views );
app.set("view options", {
  layout: false
});
app.set( "view engine", "jade" );

// Data
var postsData = require( dataDir + "/posts.json" ),
    siteData = require( dataDir + "/site.json" );

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

// Add the latest Post
var sortedPosts = sortByDate( postsData );

siteData.latestPost = postsData[ sortedPosts[ 0 ] ];

// Home
app.get( "/", function( req, res ) {
  res.render( "home", {
    view: "home",
    path: "",
    site: siteData
  });
});

// List posts
app.get( "/posts", function( req, res ) {
  var allPosts = [];

  sortedPosts.forEach( function( id, index ) {
    var _postData;

    if ( id ) {
      _postData = postsData[ id ];
      _postData.id = id;
      allPosts[ index ] = _postData;
    }

  });

  res.render( "posts", {
    view: "posts",
    path: "..",
    site: siteData,
    posts: allPosts,
    content: ""
  });
});

// Post
app.get( "/post/:id", function( req, res ) {
  var id = req.route.params.id,
      postData = postsData[ id ],
      postTotal,
      postContent,
      postMarked,
      postScripts;

  if( !postData ) {
    res.send( "Sorry, there was no post by the name." );
  }

  // Read the file
  postTotal = fs.readFileSync( postData.path, "utf-8" );
  postContent = postTotal.split( "!!! CONTENT" )[ 1 ].split( "!!! SCRIPTS" )[ 0 ];
  postMarked = postContent.match( /<mark>[\s\S]*?<\/mark>/gm );
  postScripts = postTotal.split( "!!! CONTENT" )[ 1 ].split( "!!! SCRIPTS" )[ 1 ];

  //Convert postContent to html
  if ( postMarked ) {
    for ( var i=0, item; item = postMarked[ i ]; i++ ) {
      postContent = postContent.replace( item, marked( item.slice( 6, -7 ) ) );
    }
  }

  if ( postData ) {
    res.render( "post", {
      view: "post",
      path: "../..",
      site: siteData,
      post: postData,
      content: postContent,
      scripts: postScripts
    });
  } else {
    res.send( "Oops, no post by that name." );
  }
});

// Ok, go.
app.listen( PORT );
console.log( "Listening on port " + PORT );
