/*
 * mint.js
 * Author: Lukas Reichart
 * Created : 12.05.14
 * Copyright: Lukas Reichart
 *
 * Contains: The root namespace module for the application.
 */

/*jslint
 devel   : true,   browser : true,   continue  : true,
 newcap  : true,   indent  : 2,      maxerr    : 50,
 regexp  : true,   nomen   : true,   plusplus  : true,
 white   : true,   sloppy  : true,   vars      : false,
 */

/*global, $, mint*/

var mint = (function() {
  'use strict';
  var initModule = function( $container ) {
    mint.model.initModule();
    mint.shell.initModule( $container );
  };

  return { initModule : initModule };
}());
