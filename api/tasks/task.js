'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');


var TaskSchema = new mongoose.Schema({
  completed: {
    required: true,
    type: Boolean
  },

  title: {
    required: true,
    trim: true,
    type: String
  }
}, {strict: true});


var validKeys = Object.keys(TaskSchema.paths);


TaskSchema.virtual('links').get(function(){
  return {
    self: '/tasks/' + this._id // eslint-disable-line no-invalid-this
  };
});


TaskSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret._id;
  },

  versionKey: false,
  virtuals: true
});


TaskSchema.method('update', function(attrs){
  _.assign(this, _.pick(attrs, validKeys));
  return this.save();
});


module.exports = mongoose.model('Task', TaskSchema);
