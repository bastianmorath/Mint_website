/*
 * mint.post.js
 * Author: Lukas Reichart
 * Created : 12.05.14
 * Copyright: Lukas Reichart
 *
 * Contains: The post module is a submodule of the blog module. It represents one post
 *           on the website.
 */

/*jslint
 devel   : true,   browser : true,   continue  : true,
 newcap  : true,   indent  : 2,      maxerr    : 50,
 regexp  : true,   nomen   : true,   plusplus  : true,
 white   : true,   sloppy  : true,   vars      : false,
 */

/*global, $, mint*/

mint.makePost = function () {

  var
    configMap = {
      main_html : String() +
        '<div id="%post_id%" class="container">\n    <div class="userName"><p>%name%</p></div>\n    <div class="description"><p>%desc%</p></div>\n    <div class="containerSquare">%subject%</div>\n    <p class="NumberOfMintUps">%likes%</p> <p class="mintUps">mintUps</p><a><img class="upMintButton" src="source/arrowTop.png"><img></a>\n    <iframe class="video" width="420" height="315" src="" frameborder="0" allowfullscreen></iframe>\n    \n    <div class="bottomBar">\n        <a  ><img class="showCommentsButton" src="source/arrowBottom.png" /><img</a>\n        <p class="date">%date%</p>\n        <p class="numberOfComments">4 comments</p>\n    </div>\n    <div class="commentBox">\n        <div class="commentContainer">\n            \n        </div>\n        <div class=\'commentTextField\'>\n            <textarea onkeyup=\'textAreaAdjust(this)\' class=\'commentTextBox\' placeholder\'Enter Message here\'></textarea>\n            <a class=\'commentSendButton\'>Send</a>\n        </div>\n    </div>\n</div>',
      comment_html : String() +
        "<div class=\"comment\">\n    <p class=\"commentUserComment\">%comment%</p>\n    <p class=\"commentUserName\">-%name%</p>\n</div>\n"
    },
    stateMap = {
      $container : null,
      post_data : null,
      show_comments : false,
      comments_loaded : false
    },
    jqueryMap = {},

    initModule, setJqueryMap, appendHtml, loadComments, addComment,
    onCommentsShow, onCommentSend, onUpmint;

  setJqueryMap = function () {
    var
      $container = stateMap.$container,
      $post_object = $container.find( '#post_' + stateMap.post_data.post_id );
    jqueryMap = {
      $container : $container,
      $post_object : $post_object,
      $subject_square : $post_object.find( '.containerSquare' ),
      $comment_box : $post_object.find( '.commentBox' ),
      $comment_container : $post_object.find( '.commentContainer' ),
      $show_comments : $post_object.find( '.showCommentsButton' ),
      $add_comment : $post_object.find( '.commentSendButton' ),
      $comment_field : $post_object.find( '.commentTextBox' ),
      $upmint_button : $post_object.find( '.upMintButton' ),
      $upmint_counter : $post_object.find( '.NumberOfMintUps' )
    };
  };

  //---------------------------BEGIN EVENT HANDLERS------------------------------
  onCommentsShow = function ( event ) {
    if ( stateMap.show_comments ) {
      // hide the comments
      jqueryMap.$comment_box.css( { height : "0px" } );
      jqueryMap.$show_comments.attr( "src", "source/arrowBottom.png" );
    }
    else {
      // if the comments aren't loaded yet, load them
      if ( !stateMap.comments_loaded ) {
        loadComments();
        stateMap.comments_loaded = true;
      }
      jqueryMap.$comment_box.css( { height : "" } );
      jqueryMap.$show_comments.attr( "src", "source/arrowBlackUp.png" );
    }
    stateMap.show_comments = !stateMap.show_comments;
  };

  onCommentSend = function ( event ) {
    var
      comment = {
        comment : jqueryMap.$comment_field.val(),
        post_id : stateMap.post_data.post_id
        // comment_id vom server abrufen
      };
    comment = mint.model.comment.add( comment );
    addComment( comment );
    jqueryMap.$comment_field.val( "" );
  };

  onUpmint = function ( event ) {
    var
      $upmint_counter = jqueryMap.$upmint_counter,
      counter = parseInt( $upmint_counter.text() ) + 1;
    $upmint_counter.text( counter.toString()  );
  };

  //---------------------------END EVENT HANDLERS-------------------------------

  //---------------------------BEGIN DOM METHODS-------------------------------
  // Begin DOM function /appendHtml/
  // Purpose: Appends the HTML for the post to the container
  // Arguments: None
  // Returns: None
  // Throws: None
  // Example: appendHtml( None );
  appendHtml = function () {
    var
      html,
      post = stateMap.post_data,
      replacements, subject, admin;

    subject = mint.model.subject.get( { subject_id : post.subject_id } )[0];
    admin = mint.model.admin.get( { admin_id : post.admin_id } )[0];

    replacements = {
        "%post_id%" : "post_" + post.post_id,
        "%name%" : admin.name,
        "%subject%" : subject.name,
        "%desc%" : post.content,
        "%date%" : post.date,
        "%likes%": post.mintUps
      };

    html = configMap.main_html.replace( /%\w+%/g, function( all ) {
      return replacements[all] || all;
    });

    stateMap.$container.append( html );

    setJqueryMap();

    // format the subject square with the right background color
    jqueryMap.$subject_square.css( subject.css_map );

  };
  // End DOM function /appendHtml/

  // Begin DOM function /addComment/
  // Purpose: Adds a new comment to the comment container
  // Arguments: the comment to be added
  addComment = function ( comment ) {
    var html,
      replacements = {
        "%name%" : comment.name,
        "%comment%" : comment.comment
      };

    html = configMap.comment_html.replace( /%\w+%/g, function( all ) {
      return replacements[all] || all;
    });
    jqueryMap.$comment_container.append( html );
  };
  // End DOM function /addComment/

  // Begin DOM function /loadComments/
  // Purpose: loads all comments from the model and adds the to the comment container
  // Arguments: None
  loadComments = function () {
    var
      comments = mint.model.comment.get( { post_id : stateMap.post_data.post_id } );
    $.each( comments, function( index, comment ) {
      addComment( comment );
    });
    // don't show the comments
    jqueryMap.$comment_box.css( { height : "0px" } );
  };
  // End DOM function /loadComments/
  //---------------------------END DOM METHODS-------------------------------


  //---------------------------BEGIN PUBLIC FUNCTIONS-------------------------
  // Begin public function /initModule/
  // Purpose: initializes one new post
  // Arguments: a jquery container and the data of the post
  // Returns: true if successfull
  // Throws: None
  // Example: initModule( $('#mint'), { ... } );
  initModule = function ( $container, post_data ) {
    stateMap.$container = $container;
    stateMap.post_data = post_data;

    // Note : appendHtml calls setJqueryMap()
    appendHtml();


    // actions
    jqueryMap.$comment_box.css( { height : "0px" } );
    jqueryMap.$show_comments.click( onCommentsShow );
    jqueryMap.$add_comment.click( onCommentSend );
    jqueryMap.$upmint_button.click( onUpmint );

  };
  // End public function /initModule/


  return {
    initModule : initModule
  };
  //---------------------------END PUBLIC FUNCTIONS-------------------------------
};