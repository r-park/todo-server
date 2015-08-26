'use strict';

var mongoose = require('mongoose');


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
});


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


module.exports = mongoose.model('Task', TaskSchema);
