const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  id:          { type: String, required: true },
  name:        { type: String, required: true },
  description: { type: String },
  url:         { type: String, required: true },
  children: [
    {
      id:          { type: String },
      name:        { type: String },
      description: { type: String },
      url:         { type: String }
    }
  ]
});

module.exports = mongoose.model('Document', documentSchema);