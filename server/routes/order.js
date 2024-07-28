const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/order');
const verifyToken = require('../middleware/authMiddleware');
const validateType = require('../middleware/validateType');

router.route('/')
    .get(verifyToken, validateType(['admin']), ordersController.getOrders)
    .post(verifyToken, validateType(['admin', 'customer']), ordersController.createOrder);

router.get('/get-my-cart', verifyToken, validateType(['admin', 'customer']), ordersController.getMyCart);

router.route('/:id')
    .get(verifyToken, validateType(['admin', 'customer']), ordersController.getOrderById)
    .patch(verifyToken, validateType(['admin', 'customer']), ordersController.updateOrder)
    .delete(verifyToken, validateType(['admin', 'customer']), ordersController.deleteOrder);

router.post('/:id/add-to-cart/:productId', verifyToken, validateType(['admin', 'customer']), ordersController.addToCart); 
router.post('/:id/remove-from-cart/:productId', verifyToken, validateType(['admin', 'customer']), ordersController.removeFromCart); 
router.post('/:id/clean-cart', verifyToken, validateType(['admin', 'customer']), ordersController.cleanCart); 

router.get('/aggregate/total-bill-by-customer/:customerId', verifyToken, validateType(['admin', 'customer']), ordersController.aggregateTotalBillByCustomer);


module.exports = router;

