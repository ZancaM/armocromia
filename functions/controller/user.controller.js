const express = require('express');
const router = express.Router();
const userService = require('../service/user.service');


// Routes
router.post('/create', userService.create);
router.get('/list', userService.list);
router.get('/get/:id', userService.getById);
router.get('/delete/:id', userService.deleteById);

userService.populateList()

module.exports = router;
