/*
 * mint.shell.js
 * Author: Lukas Reichart
 * Created : 12.05.14
 * Copyright: Lukas Reichart
 *
 * Contains: The shell module is the main module of the application.
 */

/*jslint
 devel   : true,   browser : true,   continue  : true,
 newcap  : true,   indent  : 2,      maxerr    : 50,
 regexp  : true,   nomen   : true,   plusplus  : true,
 white   : true,   sloppy  : true,   vars      : false,
 */

/*global, $, mint*/

mint.shell = ( function () {
  var
    configMap = {
      main_html : String() +
        '<nav id="navbar">\n<ul id="popupAnimation">\n    <li><a id="navbar_blog" >HOME</a></li>\n    <li><a id="navbar_calendar" >VERANSTALTUNGEN</a></li>\n    <li><a id="navbar_about" >ABOUT</a></li>\n    <!-- <li><a href = "javascript:void(0)" onclick = "document.getElementById(\'light\').style.display = \'block\';\n                                document.getElementById(\'fade\').style.display = \'block\'">+</a></li>\n    -->\n    <li><a id="navbar_add">+</a></li>\n    <li><a id="navbar_login">Login</a></li>\n</ul>\n    <a id="navbar_user">Bastian Morath</a>\n\n    <div class="topLine"></div>\n</nav>\n<div id="blogHolder">\n    \n</div>\n<div id="calendarHolder">\n\n</div>\n<div id="aboutHolder">\n\n</div>\n'
    },
    stateMap = {
      $container : null,
      container_type : ""
    },
    jqueryMap = {},

    initModule, setJqueryMap, setMainContainer, onLogin;

  setJqueryMap = function () {
    var
      $container = stateMap.$container,
      $nav_items = $container.find( '.stest' );
    jqueryMap = {
      $container : $container,
      $blog_container : $container.find( '#blogHolder' ),
      $calendar_container : $container.find( '#calendarHolder' ),
      $about_container : $container.find( '#aboutHolder' ),
      $nav_blog_button : $container.find( '#navbar_blog' ),
      $nav_calendar_button : $container.find( '#navbar_calendar' ),
      $nav_about_button : $container.find( '#navbar_about' ),
      $nav_login_button : $container.find( '#navbar_login' )
    };
  };

  //---------------------------BEGIN EVENTS HANDLERS-------------------------------
  onLogin = function ( ) {
    mint.model.login( 4003155 );
  };

  //---------------------------BEGIN DOM FUNCTIONS-------------------------------
  // Begin DOM function /setMainContainer/
  // Purpose: loads a new Main container into the content area.
  // Arguments: a string which container should be loaded
  // Returns: 2
  // Throws: None
  // Example: setMainContainer( container_type );
  setMainContainer = function ( container_type ) {
    if ( stateMap.container_type === container_type ) {
      return;
    }

    switch( stateMap.container_type ) {
      case 'blog':
        jqueryMap.$nav_blog_button.css( { color : "black" } );
        mint.blog.hideModule();
        break;
      case 'calendar':
        jqueryMap.$nav_calendar_button.css( { color : "black" } );
        mint.calendar.hideModule();
        break;
      case 'about':
        jqueryMap.$nav_about_button.css( { color : "black"  } );
        mint.about.hideModule();
        break;
    }

    switch( container_type ) {
      case 'blog':
        if ( mint.blog.isLoaded() ) {
          mint.blog.showModule();
        }
        else {
          mint.blog.initModule( jqueryMap.$blog_container );
        }
        jqueryMap.$nav_blog_button.css( { color : "#ef4035" } );
        break;
      case 'calendar':
        if ( mint.calendar.isLoaded() ) {
          mint.calendar.showModule();
        }
        else {
          mint.calendar.initModule( jqueryMap.$calendar_container );
        }
        jqueryMap.$nav_calendar_button.css( { color : "#ef4035" });
        break;
      case 'about':
        if ( mint.about.isLoaded() ){
          mint.about.showModule();
        }
        else {
          mint.about.initModule( jqueryMap.$about_container );
        }
        jqueryMap.$nav_about_button.css( { color : "#ef4035" } );
        break;
      default:
        return;
    }
    stateMap.container_type = container_type;
  };
  // End DOM function /setMainContainer/

  //--------------------- BEGIN PUBLIC FUNCTIONS------------------------------
  // Begin public function /initModule/
  // Purpose: initializes the Root Module
  // Arguments: The html container for the module.
  // Returns: None
  // Throws: None
  initModule = function ( $container ) {
    $container.append( configMap.main_html );
    stateMap.$container = $container;
    setJqueryMap();

    setMainContainer( 'blog' );

    // initialize the event handlers
    jqueryMap.$nav_blog_button.click( function ( event ) {
      setMainContainer( 'blog' );
    } );
    jqueryMap.$nav_calendar_button.click( function ( event ) {
      setMainContainer( 'calendar' );
    } );
    jqueryMap.$nav_about_button.click( function ( event ) {
      setMainContainer( 'about' );
    } );

    jqueryMap.$nav_login_button.click( onLogin );
  };
  // End public function /initModule/

  return {
    initModule : initModule
  };
  //--------------------- END PUBLIC FUNCTIONS------------------------------
}());
