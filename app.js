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
    path: "",
    site: siteData
  });
});

// List posts
app.get( "/posts", function( req, res ) {
  var allPosts = [];
  sortedPosts.forEach( function( i ) {
    var id = sortedPosts[ i ],
        _postData;
    
    if( !id ) {
      return;
    }
    
    _postData = postsData[ id ];
    console.log( "DASDAS", _postData );
    _postData.id = id;

  });

  res.render( "posts", {
    path: "..",
    site: siteData,
    posts: postsData,
    content: ""
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

  // Read the file
  postContent = fs.readFileSync( postData.path, "utf-8" )
    .split("!!! CONTENT")[ 1 ];

  //Convert postContent to html
  postContent = marked( postContent );

  if ( postData ) {
    res.render( "post", {
      path: "../..",
      site: siteData,
      post: postData,
      content: postContent
    });
  } else {
    res.send( "Oops, no post by that name." );
  }
});

// Ok, go.
app.listen( PORT );
console.log( "Listening on port " + PORT );
