/*
Dev Notes:
-The $(document).ready() is called upon page load and can be considered the 'main' program function.
-The subfunctions listed below ready() are support functions and the comments at the top of each function
should be clear as when they are called and how they are used within the website/program.
*/

//Global Variables
var parentDiv; //Used to hold a jQuery variable for scrolling.
var contentLoaded = [false, false, false, false, false]; //Used to track if content has been loaded

// Wait until the DOM has loaded before querying the document
$(document).ready(function ( ) {
  console.log('The program is starting...');

  $('#mainp').text('This text is animated!');
  $('#mainp').slideUp('slow');

  
  debugger;   
  
  //Initialize the animation of  + & - glyphicons to indicate the collapse state of each panel.
  initCollapseIcon($('#collapseAbout'));
  initCollapseIcon($('#collapseJavaScript'));
  initCollapseIcon($('#collapseWebDev'));
  initCollapseIcon($('#collapseEmbedded'));
  initCollapseIcon($('#collapseCircuits'));
  
  //Load the About/Overview section as initial content after site has been loaded.
  LoadContent($('#collapseAbout').find('.panel-body'));

  console.log('...The program has ended.');
});


//Function to scroll to a designated tag when the appropriate link is clicked.
//Source: http://stackoverflow.com/questions/1586341/how-can-i-scroll-to-a-specific-location-on-the-page-using-jquery
$.fn.scrollView = function () {
  return this.each(function () {
      //debugger;
      $('html, body').animate({
          scrollTop: $(this).offset().top-50
      }, 1000);
  });
}


//Initialize the glyphicon + and - signs on collapsable panels.
// id = a string with the id of a DOM element. e.x. '#colapseAbout'
var initCollapseIcon = function (id) { 
//this.initCollapseIcon = function(id) { //Angular code

  //debugger;

  //This init function attaches the following code to the '.collapse' class events.
  $(id).on("hide.bs.collapse", function(){

    //Walk the DOM and find the nearest glyphicon icon.
    var glyf = $(this).parent().find(".glyphicon")[0];

    //Switch the minus to a plus
    $(glyf).removeClass('glyphicon-minus');
    $(glyf).addClass('glyphicon-plus');

  });
  $(id).on("show.bs.collapse", function(){

    //debugger;

    //Walk the DOM and find the nearest glyphicon icon.
    var glyf = $(this).parent().find(".glyphicon")[0];

    //Switch the plus to a minus.
    $(glyf).removeClass('glyphicon-plus');
    $(glyf).addClass('glyphicon-minus');
    
    //Load content if it hasn't been loaded yet.
    LoadContent($(this).parent().find('.panel-body'));

    //Scroll to the spot that was just clicked
    //debugger;
    //$(this).parent().scrollView();
    //
  });

  //This function is called after the content has been shown.
  //Unfortunately, it's called twice for nested content.
  $(id).on("shown.bs.collapse", function(){

    /*
    The Bootstrap Scrollspy component doesn't work with Collapsable panels.
    In order to scroll to a panel when its expanded, I added the code below.
    It's not perfect. Unfortunately, this function is called once for each\
    level of nested panel. The hack below allows me to scroll to the top panel
    and the first child panel, but no the second child (third level). 
    */

    //Handle the first call/initialization of this function.
    if(parentDiv == null) {
      $(this).parent().scrollView();
      parentDiv = $(this);
      return;
    }

    var isChild = parentDiv.find(this); //attempt to find the current 'this' embedded in parentDiv.

    //isChild.length > 0 if the present selection is a child panel.
    if( isChild.length > 0 ) {
      $(this).parent().scrollView();
      //tempthis = $(this);
    }

    else {          
      //If this is the same parent div calling the function, just return and ignore it.
      if(parentDiv[0] == $(this)[0])
        return;

      //If this is a different section, then scroll to it and save it as the current parentDiv.
      $(this).parent().scrollView();
      parentDiv = $(this);
    }

  });

};


//This function is called everytime a collapsable panel is expanded. It's
//purpose is to dynamically load content as needed.
//'id' is the jQuery pointer to the parent of the element that was clicked.
//This function called by initCollapseIcon().
var LoadContent = function(id) {
  
  //debugger;
  
  switch (id.parent().attr('id')) {
    case 'collapseAbout':
      if( contentLoaded[0] == false) {
        id.load('/content-about.html');
        id.find('.defaultMessage').hide(); //Hide the default message
        contentLoaded[0] = true;
      }
      break;
    
    case 'collapseJavaScript':
      if( contentLoaded[1] == false ) {
        id.load('/content-javascript.html');
        id.find('.defaultMessage').hide(); //Hide the default message
        contentLoaded[1] = true;
      }
      break;
      
    case 'collapseWebDev':
      if( contentLoaded[2] == false ) {
        id.load('/content-webdev.html');
        id.find('.defaultMessage').hide(); //Hide the default message
        contentLoaded[2] = true;
      }
      break;
      
    case 'collapseEmbedded':
      if( contentLoaded[3] == false ) {
        id.load('/content-embedded.html');
        id.find('.defaultMessage').hide(); //Hide the default message
        contentLoaded[3] = true;
      }
      break;
      
    case 'collapseCircuits':
      if( contentLoaded[4] == false ) {
        id.load('/content-EE.html');
        id.find('.defaultMessage').hide(); //Hide the default message
        contentLoaded[4] = true;
      }
      break;
  }
  
  
  
}