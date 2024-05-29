const express = require('express');
var router = express.Router();
const productsController = require('../controllers/product');
const verifyToken = require('../middleware/authMiddleware');
const validateType = require('../middleware/validateType');

router.route('/')
    .get(verifyToken, validateType(['admin' , 'customer' , 'supplier']), productsController.getProducts)
    .post(verifyToken, validateType(['admin' , 'supplier']), productsController.createProduct);

router.route('/:id')
    .get(verifyToken, validateType(['admin' , 'customer' , 'supplier']), productsController.getProduct)
    .patch(verifyToken, validateType(['admin' , 'customer' , 'supplier']), productsController.updateProduct)
    .delete(verifyToken, validateType(['admin']), productsController.deleteProduct);

module.exports = router;