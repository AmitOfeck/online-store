const express = require('express');
var router = express.Router();
const usersController = require('../controllers/user');
const verifyToken = require('../middleware/authMiddleware');
const validateType = require('../middleware/validateType');

router.route('/')
    .get(usersController.getUsers)
    .post(usersController.createUser);

router.route('/:id')
    .get(usersController.getUser)
    .patch(verifyToken, validateType(['admin']), usersController.updateUser)
    .delete(usersController.deleteUser);

module.exports = router;