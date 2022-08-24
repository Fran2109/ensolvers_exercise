let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

let FoldersSchema = require('../models/Folders');
let ItemsSchema = require('../models/Items');


// CREATE Item
router.route('/create-item').post((req, res, next) => {
    ItemsSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  })
});

router.route('/create-folder').post((req, res, next) => {
    FoldersSchema.create(req.body, (error, data) => {
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
  ItemsSchema.find({"folder": null}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  })
})

router.route('/Get-Folders').get((req, res) => {
  FoldersSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  })
})

router.route('/Get-Items-Folder/:id').get((req, res) => {
  ItemsSchema.find({"folder": req.params.id}, (error, data) => {
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
  ItemsSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

router.route('/edit-folder/:id').get((req, res) => {
  FoldersSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

// Update Item
router.route('/update-item/:id').put((req, res, next) => {
  ItemsSchema.findByIdAndUpdate(req.params.id, {
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

router.route('/update-folder/:id').put((req, res, next) => {
  FoldersSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
      console.log('Folder updated successfully !');
    }
  })
})

router.route('/update-folder-state/:id').put((req, res, next) => {
  ItemsSchema.updateMany({"folder": req.params.id}, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
      console.log('Folder updated successfully !');
    }
  })
})

// Delete Item
router.route('/delete-item/:id').delete((req, res, next) => {
  ItemsSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

router.route('/delete-folder/:id').delete((req, res, next) => {
  FoldersSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

router.route('/delete-item-in-folder/:id').delete((req, res, next) => {
  ItemsSchema.remove({"folder": req.params.id}, (error, data) => {
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