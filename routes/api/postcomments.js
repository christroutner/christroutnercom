var async = require('async'),
keystone = require('keystone');

var PostComment = keystone.list('PostComment');

/**
 * List Post Comments
 */
exports.list = function(req, res) {
	PostComment.model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			comments: items
		});
		
	});
}

/**
 * Get Post Comments by ID
 */
exports.get = function(req, res) {
	PostComment.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.apiResponse({
			comments: item
		});
		
	});
}


/**
 * Create a Post Comment
 */
exports.create = function(req, res) {
	
	var item = new PostComment.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			comments: item
		});
		
	});
}

/**
 * Get Post Comment by ID
 */
exports.update = function(req, res) {
	PostComment.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				comments: item
			});
			
		});
		
	});
}

/**
 * Delete Post Comments by ID
 */
exports.remove = function(req, res) {
	PostComment.model.findById(req.params.id).exec(function (err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		item.remove(function (err) {
			if (err) return res.apiError('database error', err);
			
			return res.apiResponse({
				success: true
			});
		});
		
	});
}

