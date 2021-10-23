const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let foldersSchema = new Schema({
  nameFolder: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date().now
  }
}, {
    collection: 'folders'
  })

module.exports = mongoose.model('Folders', foldersSchema);