/*
 * mint.post_prop.js
 * Author: Lukas Reichart
 * Created : 12.05.14
 * Copyright: Lukas Reichart
 *
 * Contains: The module to add a proposal for a post on the blog site.
 */

/*jslint
 devel   : true,   browser : true,   continue  : true,
 newcap  : true,   indent  : 2,      maxerr    : 50,
 regexp  : true,   nomen   : true,   plusplus  : true,
 white   : true,   sloppy  : true,   vars      : false,
 */

/*global, $, mint*/

mint.makePostProp = function () {
  var
    configMap = {
      main_html : String() +
        '\n\n<div  class=\'addPost\' >\n\n    <div class="subjectSquaresInAddVeranstaltung" >\n\n        <div class = "square square6">T</div>\n        <div class = "square square5">B</div>\n        <div class = "square square4">C</div>\n        <div class = "square square3">P</div>\n        <div class = "square square2">I</div>\n        <div class = "square square1">M</div>\n    </div>\n\n    <div class =\'title\'>\n       Suggest new event\n    </div>\n    <p>Name: </p>\n    <textarea class="nameTextbox"></textarea>\n    <p>Description: </p>\n    <textarea  onkeyup="textAreaAdjust(this)" class="descriptionTextbox"></textarea>\n    <p>URL: </p>\n    <textarea class="URLTextbox" ></textarea>\n\n    <a class="sendButton">Send</a>\n    <a class="closeButton">Cancel</a>\n</div>\n'
    },
    stateMap = {
      $container : null
    },
    jqueryMap = {},

    initModule, setJqueryMap;

  setJqueryMap = function () {
    var
      $container = stateMap.$container;
    jqueryMap = {
      $container : $container
    }
  };

  initModule = function ( $container ) {
    stateMap.$container = $container;
    $container.prepend( configMap.main_html );
    setJqueryMap();

    return true;
  };

  return {
    initModule : initModule
  };
};