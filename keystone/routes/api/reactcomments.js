var async = require('async'),
keystone = require('keystone');

var ReactComment = keystone.list('ReactComment');

/**
 * List Post Comments
 */
exports.list = function(req, res) {
	ReactComment.model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			comments: items
		});
		
	});
}

/**
 * Get React Comments by ID
 */
exports.get = function(req, res) {
	ReactComment.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.apiResponse({
			comments: item
		});
		
	});
}


/**
 * Create a React Comment
 */
exports.create = function(req, res) {
	
	var item = new ReactComment.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			comments: item
		});
		
	});
}

/**
 * Get React Comment by ID
 */
exports.update = function(req, res) {
	ReactComment.model.findById(req.params.id).exec(function(err, item) {
		
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
 * React Post Comments by ID
 */
exports.remove = function(req, res) {
	ReactComment.model.findById(req.params.id).exec(function (err, item) {
		
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

