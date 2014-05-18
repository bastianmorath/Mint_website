/*
 * mint.calendar.js
 * Author: Lukas Reichart
 * Created : 18.05.14
 * Copyright: Lukas Reichart
 *
 * Contains: The about module of the mint application.
 */

/*jslint
 devel   : true,   browser : true,   continue  : true,
 newcap  : true,   indent  : 2,      maxerr    : 50,
 regexp  : true,   nomen   : true,   plusplus  : true,
 white   : true,   sloppy  : true,   vars      : false,
 */

/*global, $, mint*/

mint.about = ( function () {
  'use strict';

  var
    configMap = {
      main_html : String()
        + '<div class="about">\n    <h4>Was ist MINT?</h4>\n    <p>Die gesellschaftliche Entwicklung und der Wohlstand\n        in der Schweiz hängen zu grossen Teilen mit den Leistungen\n        in Technik und Naturwissenschaft zusammen. Erfindergeist\n        und die intelligente Umsetzung von Grundlagenwissen haben\n        eine lange Tradition. Damit auch die heutigen Schülerinnen\n        und Schüler einen spannenden Zugang in die faszinierende Welt\n        von Mathematik, Informatik, Naturwissenschaft und Technik (MINT)\n        erhalten, haben wir die Plattform MINT initiiert.</p>\n\n    <h4>Wer hat MINT erstellt?</h4>\n    <p>MINT wurde im Ergänzungsfach Informatik im 6.\n        Jahr an der Kantonsschule Uster von Lukas Reichart\n        und Bastian Morath geplant, designed und programmiert.</p>\n</div>'
    },
    stateMap = {
      $container : null,
      is_loaded : false
    },
    jqueryMap = {},

    initModule, setJqueryMap, showModule, hideModule;

  setJqueryMap = function () {
    var
      $container = stateMap.$container;
    jqueryMap = {
      $container : $container
    }
  };

  showModule = function () {
    jqueryMap.$container.css( { display : "" } );
  };

  hideModule = function () {
    jqueryMap.$container.css( { display : "none" } );
  };

  initModule = function ( $container ) {
    $container.append( configMap.main_html );
    stateMap.$container = $container;
    setJqueryMap();

    stateMap.is_loaded = true;
  };

  return {
    initModule : initModule,
    showModule : showModule,
    hideModule : hideModule,
    isLoaded : function () { return stateMap.is_loaded; }
  };

}() );