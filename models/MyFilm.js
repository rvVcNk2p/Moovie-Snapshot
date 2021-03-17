const mongoose = require('mongoose');

const MyFilmSchema = new mongoose.Schema({
  filmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'film'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  note: {
    type: String
  },
  isAlreadySeen: {
    type: Boolean
  },
  isNeedItToWatch: {
    type: Boolean
  },
  rating: {
    type: Number
  }
});

module.exports = MyFilm = mongoose.model('myFilm', MyFilmSchema);
