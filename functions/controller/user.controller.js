const express = require('express');
const router = express.Router();
const userService = require('../service/user.service');
const API = require('../middleware/apikeys')

// Routes
router.post('/create',API.validateKey, userService.create);
router.get('/list', userService.list);
router.get('/get/:id', userService.getById);
router.get('/delete/:id', userService.deleteById);

userService.populateList()

module.exports = router;
