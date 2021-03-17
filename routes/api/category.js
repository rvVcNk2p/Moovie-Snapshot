const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Category = require('../../models/Category');

//  @route  GET api/category/
//  @desc   Get caregories
//  @access Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({ categories, msg: 'All Moovie category is here! Take it.' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//  @route  POST api/category
//  @desc   Register new category
//  @access Private
router.post('/', auth, async (req, res) => {
  // TODO - name, symbol validation
  try {
    const { name, symbol, bgColor, fontColor } = req.body;

    const category = await Category.findOne({ name });

    if (!category) {
      const newCategory = new Category({ name, symbol, bgColor, fontColor });
      const newlyCreatedCategory = await newCategory.save();

      return res.status(200).json({
        category: newlyCreatedCategory,
        msg: 'Category created successfully!',
      });
    } else
      res.status(400).json({ errors: [{ msg: 'Category already exists!' }] });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//  @route  PUT api/category/:category_id
//  @desc   Update category by ID
//  @access Private
router.put(
  '/:category_id',
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
      const _id = req.params.category_id;
      const { name, symbol, fontColor, bgColor } = req.body;

      const isCategory = await Category.findById({ _id });

      console.log('isCategory: ', isCategory);
      if (isCategory) {
        const updatedCategory = await Category.findByIdAndUpdate(
          { _id },
          {
            name,
            symbol,
            fontColor,
            bgColor,
          },
          { new: true }
        );
        console.log(updatedCategory);
        return res.json({
          category: updatedCategory,
          msg: 'Category has been updated!',
        });
      } else {
        res.status(404).json({
          errors: [{ msg: `Category with ID: ${_id}, does not exists!` }],
        });
      }
    } catch (err) {
      console.log(err.message);
      if (err.kind === 'ObjectId') {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Category not found!' }] });
      }
      res.status(500).send('Server Error');
    }
  }
);

//  @route  DELETE api/category/:category_id
//  @desc   Remove category by ID
//  @access Private
router.delete('/:category_id', auth, async (req, res) => {
  try {
    const _id = req.params.category_id;

    if (_id) {
      const category = await Category.findById(_id);
      if (category) {
        await Category.findByIdAndDelete(_id);
        // TODO - Remove category from all films
        return res.json({ msg: 'Category has been removed!' });
      } else {
        return res.status(404).json({
          errors: [{ msg: `Category with ID: ${_id}, does not exists!` }],
        });
      }
    } else {
      res.status(404).json({ errors: [{ msg: 'Category not found!' }] });
    }
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res
        .status(404)
        .json({ errors: [{ msg: 'Not valid category ID.' }] });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
