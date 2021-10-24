let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();


let itemsSchema = require('../models/Items');
let foldersSchema = require('../models/Folders');

// CREATE Item
router.route('/create-item').post((req, res, next) => {
    itemsSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  })
});

router.route('/create-folder').post((req, res, next) => {
    foldersSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  })
});

// READ Items
router.route('/').get((req, res) => {
  itemsSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  })
})

// Get Single Item
router.route('/edit-item/:id').get((req, res) => {
  itemsSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})


// Update Item
router.route('/update-item/:id').put((req, res, next) => {
  itemsSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
      console.log('Item updated successfully !');
    }
  })
})

// Delete Item
router.route('/delete-item/:id').delete((req, res, next) => {
  itemsSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;