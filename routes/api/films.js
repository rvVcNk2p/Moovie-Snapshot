const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
//const Category = require('../../models/Category');
const Film = require('../../models/Film');

//  @route  GET api/films/
//  @desc   Get films
//  @access Public
router.get('/', async (req, res) => {
  try {
    const films = await Film.find({}).populate('categories');
    res.json({ films, msg: 'Films are here!' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//  @route  POST api/films
//  @desc   Register new film
//  @access Private
router.post('/', auth, async (req, res) => {
  // TODO - _id, name, symbol validation
  try {
    const { _id, name, coverURI, categories } = req.body;
    if (_id) {
      const film = await Film.findById(_id);
      return res.status(400).json({ film, msg: 'Film already exists!' });
    } else {
      const film = await Film.findOne({ name }).populate('categories');

      if (!film) {
        const newlyCreatedFilm = await Film.findOneAndUpdate(
          { name },
          { name, coverURI, categories },
          { upsert: true, new: true }
        ).populate('categories');

        return res.status(200).json({
          newlyCreatedFilm,
          msg: 'Film created successfully!',
        });
      } else
        res.status(400).json({ errors: [{ msg: 'Film already exists!' }] });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//  @route  PUT api/films/:film_id
//  @desc   Update film by ID
//  @access Private
router.put(
  '/:film_id',
  [
    check('name', 'Name is required with minimum length of 3 character.')
      .not()
      .isEmpty()
      .isLength({ min: 3 }),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // TODO - _id, name, symbol validation
    try {
      const _id = req.params.film_id;
      const { name, coverURI, categories } = req.body;

      const isFilmExists = await Film.findById({ _id });

      if (isFilmExists) {
        const updatedFilm = await Film.findByIdAndUpdate(
          { _id },
          {
            name,
            coverURI,
            categories,
          },
          { new: true }
        ).populate('categories');

        return res.json({
          film: updatedFilm,
          msg: 'Film has been updated!',
        });
      } else {
        res.status(404).json({
          errors: [{ msg: `Film with ID: ${_id}, does not exists!` }],
        });
      }
    } catch (err) {
      console.log(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ errors: [{ msg: 'Film not found!' }] });
      }
      res.status(500).send('Server Error');
    }
  }
);

//  @route  DELETE api/films/:film_id
//  @desc   Remove film by ID
//  @access Private
router.delete('/:film_id', auth, async (req, res) => {
  try {
    const _id = req.params.film_id;

    if (_id) {
      const film = await Film.findById(_id);
      if (film) {
        await Film.findByIdAndDelete(_id);
        return res.json({ msg: 'Film has been removed!' });
      } else {
        return res
          .status(404)
          .json({ msg: `Film with ID: ${_id}, does not exists!` });
      }
    } else {
      res.status(404).json({ msg: 'Film ID is not valid!' });
    }
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Film not found!' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
