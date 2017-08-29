var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api') 
};

module.exports = function(app) {

  // Keystone Views
  //app.get('/test', routes.views.test);
  
  
  //API for blog comments
  app.get('/api/postcomments/list', keystone.middleware.api, routes.api.postcomments.list);
  app.get('/api/postcomments/:id', keystone.middleware.api, routes.api.postcomments.get);
  app.all('/api/postcomments/:id/update', keystone.middleware.api, routes.api.postcomments.update);
  app.all('/api/postcomments/create', keystone.middleware.api, routes.api.postcomments.create);
  
  //API for React comment demo
  app.get('/api/reactcomments/list', keystone.middleware.api, routes.api.reactcomments.list);
  app.get('/api/reactcomments/:id', keystone.middleware.api, routes.api.reactcomments.get);
  app.all('/api/reactcomments/:id/update', keystone.middleware.api, routes.api.reactcomments.update);
  app.all('/api/reactcomments/create', keystone.middleware.api, routes.api.reactcomments.create);
  app.get('/api/reactcomments/:id/remove', keystone.middleware.api, routes.api.reactcomments.remove);
  
  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
  //app.get('/loggedinuser', middleware.requireUser, routes.views.loggedinuser);
}