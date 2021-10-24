var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FoldersSchema = new Schema({
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
  }
});

module.exports = mongoose.model("Folders", FoldersSchema)