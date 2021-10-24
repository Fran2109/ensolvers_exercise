const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let foldersSchema = new Schema({
  name: {
    type: String
  },
  dateCreated: {
    type: String
  },
  dateUpdated: {
    type: String
  }
}, {
  collection: 'folders'
})

module.exports = mongoose.model('Folders', foldersSchema)