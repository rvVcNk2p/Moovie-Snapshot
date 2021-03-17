const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  coverURI: {
    type: String,
    default: null
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category'
    }
  ]
});

module.exports = Film = mongoose.model('film', FilmSchema);
