const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    default: '🎬',
  },
  fontColor: {
    type: String,
    default: '#fff',
  },
  bgColor: {
    type: String,
    default: '#90a4ae',
  },
});

module.exports = Category = mongoose.model('category', CategorySchema);
