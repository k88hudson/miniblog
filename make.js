require('shelljs/make');

// Read all files in data/posts and generate posts.json, which contains a manifest of all posts.
function updateManifest() {
  console.log( "### UPDATING MANIFEST ### " );
   var data,
      count = 0,
      outputFile = "posts.json";

  cd( "data");
  data = JSON.parse( cat( outputFile ) ) || {};

  cd( "posts");
  ls( "*.html" ).forEach( function( file ) {
    var fileName = file.split( "." )[ 0 ],
        fileContents = cat( file ).split( "!!! CONTENT" ),
        fileMeta,
        fileData = {};

    fileMeta = fileContents[ 0 ].match(/[^\r\n]+/g);
    fileMeta.forEach( function( item ) {
      item = item.split( ": ");
      var label = item[ 0 ].toLowerCase();
      if ( label === "title" ) {
        fileData.title = item[ 1 ];
      } else if ( label === "date" ) {
        fileData.date = item[ 1 ];
      } else if ( label === "summary" ) {
        fileData.summary = item[ 1 ];
      }
    });
    fileData.id = fileName;
    fileData.path = "data/posts/" + file;

    if ( data[ fileName ] ) {
      console.log( fileName + " was updated." );
      data[ fileName ] = fileData;
    } else {
      console.log( fileName + " was added." );
      data[ fileName ] = fileData;
      count += 1;
    }

  });

  cd( "..");
  JSON.stringify( data, null, 2 ).to( outputFile );
  console.log( "All done. " + count + " posts were added." );
  cd( "..");
}

// Run the server.
target.server = function() {
  updateManifest();
  console.log( "### RUNNING SERVER ### " );
  exec( "node app.js", { async: true } );
};

// Update the manifest
target.manifest = updateManifest;
