/*
 * mint.calendar.js
 * Author: Lukas Reichart
 * Created : 18.05.14
 * Copyright: Lukas Reichart
 *
 * Contains: The calendar module of the mint application.
 */

/*jslint
 devel   : true,   browser : true,   continue  : true,
 newcap  : true,   indent  : 2,      maxerr    : 50,
 regexp  : true,   nomen   : true,   plusplus  : true,
 white   : true,   sloppy  : true,   vars      : false,
 */

/*global, $, mint*/

mint.calendar = ( function () {
  'use strict';

  var
    configMap = {
      main_html: String()
        + '<div  class=\'addEvent\' >\n\n    <div class =\'title\'>\n        Add new Event\n    </div>\n    <p>Title: </p>\n    <textarea class="titleTextbox"> </textarea>\n    <p>Description: </p>\n    <textarea  onkeyup="textAreaAdjust(this)" class="descriptionTextbox"> </textarea>\n    \n    <div class="beginDIV">\n      <p >Begin: </p>\n      <textarea class="startTimebox" > </textarea>\n\n    </div>\n    \n    <div class="endDIV">\n        <p class="endP" >End: </p>\n        <textarea  class="endTimebox" > </textarea>\n        \n    </div>\n  \n    \n    <p>Ort: </p>\n    <textarea class="locationTextbox" > </textarea>\n    <a class="sendButton" href = "javascript:void(0)" onclick = "document.getElementById(\'light\').style.display = \'none\';\n                        document.getElementById(\'fade\').style.display = \'none\'">Send</a>\n\n</div>\n\n\n\n<div class="container">\n    <p class="title">William Leavitt - Sidereal Time</p>\n\n    <p class="desc">William Leavitt (*1941) gehört zu den wichtigsten Pionieren der Konzeptkunst in Los Angeles und trug bereits während den späten sechziger und den siebziger Jahren massgeblich zu deren Etablierung bei. Seine Werke verwenden narrative Elemente, die der Architektur und populären Kultur von Los Angeles sowie dem Film- und Fernsehschaffen entnommen sind. Der Künstler arbeitet dabei medienübergreifend mit Skulpturen, Gemälden, Zeichnungen, Fotografie und Theater.\n        «Sidereal Time» ist die erste institutionelle Einzelausstellung des Künstlers in der Schweiz. Sowohl auf dem Hönggerberg als auch im Hauptgebäude der ETH Zürich werden neue, ortsspezifische Arbeiten des Künstlers zu sehen sein. Während Leavitt sich in der Haupthalle im Zentrum anhand einer Installation mit der Architektur von Gottfried Semper auseinandersetzt, nimmt er sich auf dem Hönggerberg dem Campus in Form von sogenannten Science Totems an. Seine Kunstwerke bilden Knotenpunkte, in denen er die unterschiedlichen Disziplinen von Kunst, Wissenschaft und Architektur zusammenführt. </p>\n\n\n\n    <p class="p_time">Wann: </p>\n    <p class="time">30 Juni 2014 15:00 - 17:00</p>\n\n    <p class="p_location">Wo: </p>\n    <p  class="location">Im Schule 77, 8606 Greifensee</p>\n\n\n\n</div>\n'
    },
    stateMap = {
      $container: null,
      is_loaded : false
    },
    jqueryMap = {},

    initModule, setJqueryMap, showModule, hideModule;

  // Begin utility function /setJqueryMap/
  // Purpose: initializes a cache map for jquery for convenience and performance
  // Arguments: None
  // Returns: None
  // Throws: None
  // Example: setJqueryMap( None );
  setJqueryMap = function () {
    var
      $container = stateMap.$container;
    jqueryMap = {
      $container : $container
    };
  };

  showModule = function () {
    jqueryMap.$container.css( { display : "" } );
  };

  hideModule = function () {
    jqueryMap.$container.css( { display : "none" } );
  };

  // Begin public function /initModule/
  // Purpose: initializes the calendar Module
  // Arguments: the $container for the Module
  // Returns: None
  // Throws: None
  // Example: initModule( $('#mint') );
  initModule = function ($container) {
    stateMap.$container = $container;
    $container.append( configMap.main_html );

    setJqueryMap();

    stateMap.is_loaded = true;

  };
  // End public function /initModule/

  return {
    initModule : initModule,
    showModule : showModule,
    hideModule : hideModule,
    isLoaded : function () { return stateMap.is_loaded; }
  };

}() );