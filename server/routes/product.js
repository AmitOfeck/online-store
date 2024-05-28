const express = require('express');
var router = express.Router();
const productsController = require('../controllers/product');

router.route('/')
    .get(productsController.getProducts)
    .post(productsController.createProduct);

router.route('/:id')
    .get(productsController.getProduct)
    .patch(productsController.updateProduct)
    .delete(productsController.deleteProduct);

module.exports = router;