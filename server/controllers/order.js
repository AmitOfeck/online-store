const orderService = require('../services/order');
const hasAllFields = require('../middleware/hasAllFiels'); 

const createOrder = async (req, res) => {
    try {
        const requiredFields = ['customerId', 'items', 'ordered', 'bill'];
  
        if (!hasAllFields(req, res, requiredFields)) return;
  
        const newOrder = await orderService.createOrder(
            req.body.customerId,
            req.body.items,
            req.body.ordered,
            req.body.bill
        );
  
        res.json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
      
        if (!order) {
            return res.status(404).json({ errors: ['Order not found'] });
        }
  
        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateOrder = async (req, res) => {
    try {
        const requiredFields = ['customerId', 'items', 'ordered', 'bill'];
  
        if (!hasAllFields(req, res, requiredFields)) return;
  
        const order = await orderService.updateOrder(
            req.params.id,
            req.body.customerId,
            req.body.items,
            req.body.ordered,
            req.body.bill
        );
  
        if (!order) {
            return res.status(404).json({ errors: ['Order not found'] });
        }
  
        res.json(order);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await orderService.deleteOrder(req.params.id);
      
        if (!order) {
            return res.status(404).json({ errors: ['Order not found'] });
        }
      
        res.send();
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
