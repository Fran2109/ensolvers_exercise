'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/* var Folders = mongoose.model('Folders'); */

var ItemsSchema = new Schema({
  name: {
    type: String
  },
  state: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: String,
  },
  dateUpdated: {
    type: String,
    default: null,
  },
  folder: {
    type: Schema.ObjectId,
    ref: "Folders",
  }
});

module.exports = mongoose.model('Items', ItemsSchema);