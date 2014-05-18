/*
 * mint.model.js
 * Author: Lukas Reichart
 * Created : 16.05.14
 * Copyright: Lukas Reichart
 *
 * Contains: The model module of the mint page.
 */

/*jslint
 devel   : true,   browser : true,   continue  : true,
 newcap  : true,   indent  : 2,      maxerr    : 50,
 regexp  : true,   nomen   : true,   plusplus  : true,
 white   : true,   sloppy  : true,   vars      : false,
 */

/*global, $, mint*/

mint.model = ( function () {
  'use strict';
  //---------------------------BEGIN MODULE SCOPE VARIABLES-------------------------------
  var

    configMap = {
      api_url : "localhost"
    },

    stateMap = {
      dataLoaded : false,
      subjects : null,
      admins : null,
      posts : null,
      comments : null
    },

    initModule, loadData, login,
    subject, post, admin, comment,
    isFakeData = true;

  //---------------------------END MODULE SCOPE VARIABLES-------------------------------

  //---------------------------BEGIN SUB MODULES-------------------------------
  // The subject object API
  // ----------------------
  subject = ( function() {
    var

      get;

    get = function ( query ) {
      if ( stateMap.dataLoaded ) {
        var result = stateMap.subjects( query ).get();
        return result;
      }
    };

    return {
      get : get,
      db : stateMap.subjects
    };
  }() );

  // The post object API
  // -------------------
  post = ( function () {
    var
      get;

    get = function ( query ) {
      if ( stateMap.dataLoaded ) {
        return stateMap.posts( query ).get();
      }
    };

    return {
      get : get
    };
  }() );

  // The admin object API
  // --------------------
  admin = ( function () {
    var
      get;

    get = function ( query ) {
      if ( stateMap.dataLoaded ) {
        return stateMap.admins( query ).get();
      }
    };

    return {
      get : get
    };
  }() );

  // The comment object API
  // ----------------------
  comment = ( function () {
    var
      get, add;

    get = function ( query ) {
      if ( stateMap.dataLoaded ) {
        return stateMap.comments( query).get();
      }
    };

    add = function ( comment ) {
      if ( comment.hasOwnProperty( 'comment') ){
        comment.name = "Lukas Reichart";
        stateMap.comments.insert( comment );
      }

      return comment;
    };

    return {
      get : get,
      add : add
    };
  }() );

  //---------------------------END SUB MODULES-------------------------------

  login = function ( userid ) {

  };

  // Begin utility function /loadData/
  // Purpose: loads all Data new from the server
  // Arguments: optional callback
  // Returns: None
  // Throws: None
  // Example: loadData( function() { alert("Data was loaded" ) );
  loadData = function ( callback ) {
    var data_map;
    stateMap.dataLoaded = false;

    if ( isFakeData ) {
      data_map = mint.fake.getData();
      stateMap.subjects = TAFFY( data_map.subjects );
      stateMap.admins = TAFFY( data_map.admins );
      stateMap.posts = TAFFY( data_map.posts );
      stateMap.comments = TAFFY( data_map.comments );
    }

    stateMap.dataLoaded = true;
    if ( callback ) { callback(); }
  };
  // End utility function /loadData/

  // Begin public function /initModule/
  // Purpose: Initializes the sub module of the model
  // Arguments: None
  // Returns: None
  // Throws: None
  // Example: initModule(  );
  initModule = function () {
    // load all the data
    loadData( function () {
      stateMap.dataLoaded = true;
    });
  };
  // End public function /initModule/

  return {
    initModule : initModule,
    subject : subject,
    post : post,
    admin : admin,
    comment : comment
  };

} () );