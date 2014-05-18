/*
 * mint.blog.js
 * Author: Lukas Reichart
 * Created : 11.05.14
 * Copyright: Lukas Reichart
 *
 * Contains: The blog module of the mint page.
 */

/*jslint
 devel   : true,   browser : true,   continue  : true,
 newcap  : true,   indent  : 2,      maxerr    : 50,
 regexp  : true,   nomen   : true,   plusplus  : true,
 white   : true,   sloppy  : true,   vars      : false,
 */

/*global, $, mint*/

mint.blog = ( function () {
  var
    configMap = {
      main_html: String()
        + '<div class="sorting">\n    <!--\n    <div class = "sortSquareLike">Like</div>\n    <div class = "sortSquareDate">Date</div>\n    -->\n    <ul>\n\n        <li class="sortElement"><a href="">Sort by:</a></li>\n\n        <div class="chooseSorting">\n            <li class="sortElement"><a href="">Likes</a></li>\n            <li class="sortElement"><a href="">Date:</a></li>\n        </div>\n\n        <div class="dateElements">\n            <li class="sortElement"><a href="">2013</a></li>\n            <li class="sortElement"><a href="">2012</a></li>\n            <li class="sortElement"><a href="">2011</a></li>\n            <li class="sortElement"><a href="">2010</a></li>\n        </div>\n\n    </ul>\n</div>\n<div class="subjectSquares" >\n    <div class="centerwrapper">\n    </div>\n</div>',
      nav_square_html : '<div class = "square" id ="square_%id%">%name%</div>'
    },
    stateMap = {
      $container : null,
      posts_filter : {
        subjects : [],
        sortBy : null
      }
    },
    jqueryMap = {},

    initModule, setJqueryMap, appendSquares, showPosts, onSubjectfilterChanged,
    formatSubjectSquares;

  //---------------------------BEGIN UTILITY FUNCTIONS-------------------------------
  // Begin utility function /setJqueryMap/
  // Purpose: creates a jquery cache Map, for performance and convenience
  // Arguments: None
  // Returns: None
  // Throws: None
  // Example: setJqueryMap();
  setJqueryMap = function () {
    var
      $container = stateMap.$container;
    jqueryMap = {
      $container : $container,
      $squareContainer : $container.find( ".subjectSquares").find( ".centerwrapper" ),
      $squares : []
    };
  };
  // End utility function /setJqueryMap/
  //---------------------------END UTILITY FUNCTIONS-------------------------------

  //---------------------------BEGIN EVENT HANDLERS-------------------------------
  // Begin event function /onSubjectfilterChanged/
  // Purpose: is execute when the user changes the filters for the posts
  // Arguments:
  // Returns: None
  // Throws: None
  // Example: subjectFilter( None );
  onSubjectfilterChanged = function ( event ) {
    var
      subject_id = this.id.split( '_' )[1],
      filter = stateMap.posts_filter;

    if ( subject_id === "all" ) {
      if ( filter.subjects.length === 0 ) { return; }
      filter.subjects = [];
    }
    else {
      if ( filter.subjects.indexOf( subject_id ) === -1 ) {
        filter.subjects.push( subject_id );
      } else {
        filter.subjects.splice( filter.subjects.indexOf( subject_id ), 1);
      }
    }
    formatSubjectSquares();
    showPosts();

  };
  //---------------------------END EVENT HANDLERS-------------------------------

  //---------------------------BEGIN DOM FUNCTIONS-------------------------------
  // Begin DOM function /appendSquares/
  // Purpose: appends the top subject squares to the "subjectSquares" container"
  // Arguments: None
  // Returns: None
  // Throws: None
  // Example: appendSquares( None );
  appendSquares = function( ) {
    var
      subjects = mint.model.subject.get();

    // Add a special version for the all Square
    subjects.push( { name : "All", subject_id : "all",
      css_map : { "background" : "lightslategrey" } } );

    $.each( subjects, function( index, subject ) {
      var
        square_html, $square_object,
        replacements = {
          "%id%" : subject.subject_id,
          "%name%" : subject.name
        };
      square_html = configMap.nav_square_html.replace( /%\w+%/g, function( all ) {
        return replacements[all] || all;
      });

      jqueryMap.$squareContainer.append( square_html);
      $square_object = jqueryMap.$squareContainer.find( '#square_' + subject.subject_id);
      $square_object.css( subject.css_map );
      $square_object.click( onSubjectfilterChanged );

      jqueryMap.$squares.push( $square_object );
    });
  };
  // End DOM function /appendSquares/

  formatSubjectSquares = function () {
    $.each( jqueryMap.$squares, function ( index, $square ) {
      var subject_id = $square.attr( 'id' ).split( '_' ) [1];

      if ( $.inArray( subject_id, stateMap.posts_filter.subjects ) === -1 ) {
        $square.css( { color : "white" } );
      } else {
        $square.css( { color : "red" } );
      }
    });
  };

  // Begin DOM function /showPosts/
  // Purpose: add the post objects to the page uses the filter_map of the state_map
  // Arguments: None
  // Returns: None
  // Throws: None
  // Example: showPosts( None );
  showPosts = function ( filter_map ) {
    var
      posts;

    if ( stateMap.posts_filter.subjects.length === 0 ) {
      posts = mint.model.post.get();
    } else {
      posts = mint.model.post.get( { subject_id : stateMap.posts_filter.subjects } );
    }

    jqueryMap.$container.find( ".container").remove();

    $.each( posts, function ( index, post_data ) {
      var post = Object.create(  mint.makePost() );
      post.initModule( stateMap.$container, post_data );
    });
  };
  // End DOM function /showPosts/

  //---------------------------END DOM FUNCTIONS -------------------------------

  //---------------------------BEGIN PUBLIC FUNCTIONS-------------------------------
  // Begin public function /initModule/
  // Purpose: initializes the blog module
  // Arguments: a jquery dom object
  // Returns: true if successfull
  // Throws: None
  // Example: initModule();
  initModule = function ( $container ) {
    $container.append( configMap.main_html );
    stateMap.$container = $container;
    setJqueryMap();

    appendSquares();
    showPosts();

    return true;
  };
  // End public function /initModule/

  return {
    initModule : initModule,
    showPosts : showPosts
  };
}());