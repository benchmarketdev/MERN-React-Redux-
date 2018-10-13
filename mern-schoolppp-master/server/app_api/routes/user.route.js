const express = require('express');
const router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user.model');
// Getting the User Controller

const UserController = require('../controllers/user.controller');

// Map each API to the Controller Functions

router.post('/authenticate', UserController.authenticate);
router.post('/register', UserController.createUser);

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUserById);
// router.put('/:id', function (req, res, next) {

// User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//   if (err) return next(err);
//   console.log('===route=====')
//   console.log(req.body);
//   res.json(post);
// });
// });

router.delete('/:id', UserController.removeUser);

// Export the Router
module.exports = router;