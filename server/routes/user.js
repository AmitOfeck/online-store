const express = require('express');
var router = express.Router();
const usersController = require('../controllers/user');

router.route('/')
    .get(usersController.getUsers)
    .post(usersController.createUser);

router.route('/:id')
    .get(usersController.getUser)
    .patch(usersController.updateArticle)
    .delete(usersController.deleteArticle);

module.exports = router;