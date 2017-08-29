var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * React Comments Model
 * ===================
 */

var ReactComment = new keystone.List('ReactComment', {
//        nocreate: true
});

ReactComment.add({
  name: { type: String, index: true },
  message: { type: String },
  dateStamp: { type: String }
});


/**
 * Registration
 * ============
 */

ReactComment.defaultColumns = 'name, dateStamp|20%';
ReactComment.register();