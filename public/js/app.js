(function() {
  
  debugger;
  
  
  
  var app = angular.module('mainPage', []);

  
  
  app.controller('PrimaryController', function() {    
    debugger;
    function initFnc() {
    
      debugger;
      var blah = $(this);
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
    debugger;
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

