const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  uniqueName: { type: String, required: true, unique: true },
  size: { type: Number, required: true },
  extension: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);