/*
 * mint.fake.js
 * Author: Lukas Reichart
 * Created : 16.05.14
 * Copyright: Lukas Reichart
 *
 * Contains: A fake data model, that is used for debuging.
 */

/*jslint
 devel   : true,   browser : true,   continue  : true,
 newcap  : true,   indent  : 2,      maxerr    : 50,
 regexp  : true,   nomen   : true,   plusplus  : true,
 white   : true,   sloppy  : true,   vars      : false,
 */

/*global, $, mint*/

mint.fake = ( function () {
  'use strict';
  var
    subjects, posts, admins, comments,

    getData;

  subjects = [
    {
      subject_id : "0",
      name : "Mathematik",
      css_map : {"background" : "dodgerblue"}
    },
    {
      subject_id : "1",
      name : "Informatik",
      css_map : {
        "background" : "green"
      }
    },
    {
      subject_id : "2",
      name : "Physik",
      css_map : {
        "background" : "lightseagreen"
      }
    },
    {
      subject_id : "3",
      name : "Chemie",
      css_map : {
        "background" : "orange"
      }
    },
    {
      subject_id : "4",
      name : "Biologie",
      css_map : {
        "background" : "royalblue"
      }
    },
    {
      subject_id : "5",
      name : "Technik",
      css_map : {
        "background" : "yellowgreen"
      }
    }
  ];

  admins = [
    {
      admin_id : "1",
      name : "Andreas Lichtenberger"
    },
    {
      admin_id : "2",
      name : "Lukas Reichart"
    },
    {
      admin_id : "3",
      name : "Bastian Morath"
    }
  ];

  posts = [
    {
      post_id: "10",
      subject_id: "0",
      admin_id: "2",
      date: "2014-03-19",
      content: 'Die gesellschaftliche Entwicklung und der Wohlstand        in der Schweiz hängen zu grossen Teilen mit den Leistungen        in Technik und Naturwissenschaft zusammen. Erfindergeist        und die intelligente Umsetzung von Grundlagenwissen haben        eine lange Tradition. Damit auch die heutigen Schülerinnen        und Schüler einen spannenden Zugang in die faszinierende Welt        von Mathematik, Informatik, Naturwissenschaft und Technik (MINT)      erhalten, haben wir die Plattform MINT initiiert.Die gesellschaftliche Entwicklung und der Wohlstand        in der Schweiz hängen zu grossen Teilen mit den Leistungen        in Technik und Naturwissenschaft zusammen. Erfindergeist        und die intelligente Umsetzung von Grundlagenwissen haben        eine lange Tradition. Damit auch die heutigen Schülerinnen        und Schüler einen spannenden Zugang in die faszinierende Welt        von Mathematik, Informatik, Naturwissenschaft und Technik (MINT)      erhalten, haben wir die Plattform MINT initiiert.',
      url: "https://www.youtube.com/watch?v=gFntM0F9Vbw",
      mintUps : "54"
    },
    {
      post_id: "1",
      subject_id: "0",
      admin_id: "1",
      date: "2014-03-16",
      content: "This is an awesome video:",
      url: "https://www.youtube.com/watch?v=uCdlx2ZX-sc",
      mintUps : "512"
    },
    {
      post_id: "3",
      subject_id: "0",
      admin_id: "1",
      date: "2014-03-12",
      content: "New Ted Talsk",
      url: "http://www.ted.com/talks/daniel_reisel_the_neuroscience_of_restorative_justice",
      mintUps : "200"
    },
    {
      post_id: "2",
      subject_id: "0",
      admin_id: "1",
      date: "2014-03-04",
      content: "Coding all night to get lucky.",
      url: "",
      mintUps : "8"
    },
    {
      post_id: "6",
      subject_id: "1",
      admin_id: "1",
      date: "2014-03-04",
      content: "Coding all night to get lucky.",
      url: "",
      mintUps : "8"
    },
    {
      post_id: "7",
      subject_id: "1",
      admin_id: "1",
      date: "2014-03-04",
      content: "Coding all night to get lucky.",
      url: "",
      mintUps : "8"
    }
  ];

  comments = [
    {
      comment_id : "1",
      name : "Lukas Reichart",
      comment : "Das ist ein tolles VideoDas ist ein tolles VideoDas ist ein tolles VideoDas ist ein tolles VideoDas ist ein tolles VideoDas ist ein tolles VideoDas ist ein tolles VideoDas ist ein tolles VideoDas ist ein tolles VideoDas ist ein tolles VideoDas ist ein tolles Video",
      post_id : "1"
    },
    {
      comment_id : "2",
      name : "Bastian Morath",
      comment : "mint up",
      post_id : "1"
    },
    {
      comment_id : "3",
      name : "Lukas Reichart",
      comment : "totally",
      post_id : "1"
    }
  ];

  getData = function () {
    return {
      subjects : subjects,
      admins : admins,
      posts : posts,
      comments : comments
    };
  };


  return {
    getData : getData
  };

}() );