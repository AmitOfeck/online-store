const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/order');
const verifyToken = require('../middleware/authMiddleware');
const validateType = require('../middleware/validateType');

router.route('/')
    .get(verifyToken, validateType(['admin']), ordersController.getOrders)
    .post(verifyToken, validateType(['admin', 'customer']), ordersController.createOrder);

router.route('/:id')
    .get(verifyToken, validateType(['admin', 'customer']), ordersController.getOrderById)
    .patch(verifyToken, validateType(['admin', 'customer']), ordersController.updateOrder)
    .delete(verifyToken, validateType(['admin', 'customer']), ordersController.deleteOrder);

module.exports = router;

