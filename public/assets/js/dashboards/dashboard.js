// ---------------------------------
//
//          Variables
//         & Triggers
//
// ----------------------------------

// variables
var pathname = window.location.pathname,
    project = pathname.substr(11),
    newURL = window.location.protocol + "//" + window.location.host + "/",
    chapterColor = '#A73C5A',
    FacebookColor = '#3b5998';

// triggers
window.onload = function() {
  var trigger = new Trigger();
  trigger.findTrigger();
};

// reset value of input on page load
$('input[name=_source]').val('');
$('input[name=_target]').val('');

// // linkToggle
// document.getElementById("js-new-link").onclick = function() {
//   if ($(this).text() == "Close") {
//     $(this).text("Link nodes")
//   } else {
//     $(this).text("Close");
//     linkToggle()
//   }
// };

// addChapter
document.getElementById("js-chapter").onclick = function() {
  addChapter()
};

// reloadStory
document.getElementById("js-refresh").onclick = function() {
  d3.json(pathname+'/get-page', function(graph) {
    reloadStory(graph);
  });
};

// ---------------------------------
//
//          Facebook API
//         Powered by FB
//
// ----------------------------------

window.fbAsyncInit = function() {
  FB.init({
      appId      : '188876558188407',
      xfbml      : true,
      version    : 'v2.8'
  });
  loginCheck();
  initStoryWorld();
}

function loginCheck(){
  FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
          return true;
      }
      else {
          console.log("please login to Facebook");
          return false;
      }
  });
}

// ---------------------------------
//
//          JSON building
//        Powered by Code
//
// ----------------------------------

// check if JSON has a Storyworld
function initStoryWorld() {
  d3.json(pathname+'/get-page', function(graph) {
    var story = JSON.parse(graph.story);

    if (!story) {
        spawnNewStory(graph);
    }
    else{
        loadStory(graph);
    }
  });
}

// Get  post and build JSON
function spawnNewStory(data) {
  var storyBuilder = [];
  var storyJSON = {nodes: storyBuilder, links: [], chapters: []};

  FB.api( '/me/posts', { access_token: data.token, fields:'id, name'}, function(response) {
    if (response && !response.error) {
      response.data.forEach(function(entry){
        storyBuilderPush(entry, storyBuilder);
      });

      storyJSON = JSON.stringify(storyJSON);

      // sends the JSON to the database
      pushToBackend(storyJSON);

      initStoryWorld();
    }
  });
}

// addChapter
function addChapter() {
  var d = new Date(),
  n = d.getTime(),
  chapterTitle = "Title";

  if (chapterTitle !== '') {

    d3.json(pathname+'/get-page', function(graph) {
      var story = JSON.parse(graph.story);

      // check chapter in storyworld
      if (story.chapters) { var chapterBuilder = story.chapters; }else{ var chapterBuilder = []; }

      // check nodes in storyworld
      if (story.nodes) { var storyBuilder = story.nodes; }else{ var storyBuilder = []; }

      // check link in storyworld
      if (story.links) { var linkBuilder = story.links; }else{ var linkBuilder = []; }

      var storyJSON = {nodes: storyBuilder, links: linkBuilder, chapters: chapterBuilder};

      chapterBuilder.push({
        id: 'ch_' + n,
        name: chapterTitle,
        url:'',
        image: newURL+ 'assets/img/chapter.svg',
        stroke: chapterColor,
        fill: chapterColor
      });
      storyBuilder.push({
        id: 'ch_' + n,
        name: chapterTitle,
        url:'',
        image: newURL+ 'assets/img/chapter.svg',
        stroke: chapterColor,
        fill: chapterColor
      });

      storyJSON = JSON.stringify(storyJSON);

      // sends the JSON to the database
      pushToBackend(storyJSON);
    });
  }
}

// linkToggle
function linkToggle(id) {
  var source = $('input[name=_source]').val(),
      target = $('input[name=_target]').val();

  if (source === '') {
    source = $('input[name=_source]').val(id);
    $('#' + id).toggleClass("active", true);
  } else {
    target = $('input[name=_target]').val(id);
    $('#' + id).toggleClass("active", true);
  }
  if (source && target) {
    console.log("Source", source);
    console.log("Target", target);
    // buildLink(source, target)
    console.log("build succesful");
  };
}

// buildLink
function buildLink(Source, Target) {
  d3.json(pathname+'/get-page', function(graph) {
    var story = JSON.parse(graph.story);

    // check chapter in storyworld
    if (story.chapters) { var chapterBuilder = story.chapters; }else{ var chapterBuilder = []; }

    // check nodes in storyworld
    if (story.nodes) { var storyBuilder = story.nodes; }else{ var storyBuilder = []; }

    // check link in storyworld
    if (story.links) { var linkBuilder = story.links; }else{ var linkBuilder = []; }

    var storyJSON = {nodes: storyBuilder, links: linkBuilder, chapters: chapterBuilder},
    d = new Date(),
    n = d.getTime();

    linkBuilder.push({id: 'lk_' + n, source: Source, target: Target});
    storyJSON = JSON.stringify(storyJSON);

    // sends the JSON to the database
    pushToBackend(storyJSON);
  });
}

// reloadStory
function reloadStory(data) {
  var story = JSON.parse(data.story);

  // check chapter in storyworld
  if (story.chapters) { var chapterBuilder = story.chapters; }else{ var chapterBuilder = []; }

  // check nodes in storyworld
  var storyBuilder = [];

  // check link in storyworld
  if (story.links) { var linkBuilder = story.links; }else{ var linkBuilder = []; }

  var storyJSON = {nodes: storyBuilder, links: linkBuilder, chapters: chapterBuilder};

  chapterBuilder.forEach( function(entry) {
    storyBuilder.push({
      id: entry.id,
      name: entry.name,
      url: entry.url,
      image: entry.image,
      stroke: entry.stroke,
      fill: entry.fill
    });
  })

  FB.api( '/me/posts', { access_token: data.token, fields:'id, name'}, function(response) {
    if (response && !response.error) {
      response.data.forEach(function(entry){
          storyBuilderPush(entry, storyBuilder);
      });
    }
    storyJSON = JSON.stringify(storyJSON);

    // sends the JSON to the database
    pushToBackend(storyJSON);
  });
}

// A function to push an array in to the JSON for storyBuilder
function storyBuilderPush(entry, storyBuilder) {
  storyBuilder.push({
    id: 'fb_' + entry.id,
    name: entry.name,
    url:'https://facebook.com/'+ entry.id,
    image: newURL+ 'assets/img/facebook-app-logo.svg',
    stroke: FacebookColor,
    fill: FacebookColor
  });
}

// A function to send the storyworld to the database
function pushToBackend (storyJSON) {
  $.ajax({
    type: "POST",
    url: pathname+'/save-story',
    data: {storyJSON, '_token': $('input[name=_token]').val(), project},
    dataType: 'json'
  });
  $("#js-storyworld").find("*").not("rect").remove();
  initStoryWorld()
}
