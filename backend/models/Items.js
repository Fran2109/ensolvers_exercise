const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemsSchema = new Schema({
  name: {
    type: String
  },
  state: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: String
  },
  folder: {
    type: Schema.ObjectId,
    ref: "Folders",
    default: null,
  }
}, {
    collection: 'items'
  })

module.exports = mongoose.model('Items', itemsSchema)