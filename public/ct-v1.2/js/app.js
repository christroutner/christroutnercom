(function() {
  
  var parentDiv; //Used to hold a jQuery variable for scrolling.
  
  var app = angular.module('mainPage', []);

  //Function to scroll to a designated tag.
  //Source: http://stackoverflow.com/questions/1586341/how-can-i-scroll-to-a-specific-location-on-the-page-using-jquery
  $.fn.scrollView = function () {
    return this.each(function () {
        //debugger;
        $('html, body').animate({
            scrollTop: $(this).offset().top-50
        }, 1000);
    });
  }
  
  app.controller('PrimaryController', function() {    
    
    function initFnc() {
    
      debugger;
      var blah = $(this);
    };
    
    
    //Initialize the glyphicon + and - signs on collapsable panels.
    // id = a string with the id of a DOM element. e.x. '#colapseAbout'
    this.initCollapseIcon = function(id) {
      
      //This init function attaches the following code to the '.collapse' class events.
      $(id).on("hide.bs.collapse", function(){
        
        //Walk the DOM and find the nearest glyphicon icon.
        var glyf = $(this).parent().find(".glyphicon")[0];
        
        //Switch the minus to a plus
        $(glyf).removeClass('glyphicon-minus');
        $(glyf).addClass('glyphicon-plus');
        
      });
      $(id).on("show.bs.collapse", function(){
        
        
        
        //Walk the DOM and find the nearest glyphicon icon.
        var glyf = $(this).parent().find(".glyphicon")[0];
        
        //Switch the plus to a minus.
        $(glyf).removeClass('glyphicon-plus');
        $(glyf).addClass('glyphicon-minus');
        
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
      

  });
  
  app.controller('panelController', function() {
    
    //var blah1 = collapse-id;
    
    debugger;
    
    var blah = $(this);
    
    var blah1 = idTag;
    
    
  });
  
  app.directive('contentCircuits', function() {
    return  {
      restrict: 'E',
      templateUrl: 'content-EE.html'
    };
  });
  
  app.directive('contentAbout', function() {
    return  {
      restrict: 'E',
      templateUrl: 'content-about.html'
    };
  });
  
  app.directive('contentJavascript', function() {
    return  {
      restrict: 'E',
      templateUrl: 'content-javascript.html'
    };
  });
  
  app.directive('contentWebdev', function() {
    return  {
      restrict: 'E',
      templateUrl: 'content-webdev.html'
    };
  });
  
  app.directive('contentEmbedded', function() {
    return  {
      restrict: 'E',
      templateUrl: 'content-embedded.html'
    };
  });

  app.directive('illustrateSpotTracker', function() {
    //debugger;
    return {
      restrict: 'E',
      templateUrl: '../files/SPOT-BackEnd-Illustration.html'
    };
  });
  
  app.directive('illustrateGeoData', function() {
    //debugger;
    return {
      restrict: 'E',
      templateUrl: '../files/GeoData-BackEnd-Illustration.html'
    };
  });

  
})();

