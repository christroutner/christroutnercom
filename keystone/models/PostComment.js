var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Comments Model
 * ===================
 */

var PostComment = new keystone.List('PostComment', {
//        nocreate: true
});

PostComment.add({
  post: { type: Types.Relationship, ref: 'Post', index: true },
  date: { type: Types.Date, default: Date.now, index: true },
  commentername: { type: String },
	email: { type: Types.Email },
	content: { type: Types.Markdown }
});


/**
 * Registration
 * ============
 */

PostComment.defaultColumns = 'post, date|20%';
PostComment.register();