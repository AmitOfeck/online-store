const Order = require('../models/order');
const Product = require('../models/product'); 
const calculateBill = require('../middleware/calculateBill'); 


const createOrder = async (customerId, items, ordered, bill) => {

    if (!Array.isArray(items) || items.length > 0) {
        throw new Error('Items array must be empty when creating a new order');
    }

    const order = new Order({
        customerId,
        items,
        ordered 
    });

    order.bill = await calculateBill(items);
    return await order.save();
};

const getOrderById = async (id) => {
    return await Order.findById(id).populate('items');
};

const getOrders = async () => {
    return await Order.find({}).populate('items');
};

const updateOrder = async (id, customerId, items, ordered, bill) => {
    const order = await getOrderById(id);
    if (!order)
        return null;

    order.customerId = customerId;
    order.items = items;
    order.ordered = ordered;

    order.bill = await calculateBill(items);

    await order.save();
    return order;
};

const deleteOrder = async (id) => {
    const order = await getOrderById(id);
    if (!order)
        return null;

    for (const item of order.items) {
        const product = await Product.findById(item.id);
        if (product) {
            product.currentStock += item.quantity;
            await product.save();
        }
    }

    await order.remove();
    return order;
};


const addToCart = async (id, productId) => {
    const order = await getOrderById(id);
    if (!order) {
        throw new Error('Order not found');
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Product not found');
    }

    const item = order.items.find(item => item.id.equals(productId));
    if (item) {
        if (product.currentStock < 1) {
            throw new Error('Not enough stock');
        }
        item.quantity += 1;
    } else {
        if (product.currentStock < 1) {
            throw new Error('Not enough stock');
        }
        order.items.push({ id: productId, quantity: 1 });
    }
    product.currentStock -= 1;
    await product.save();

    order.bill = await calculateBill(order.items);

    await order.save();
    return order;
};


const removeFromCart = async (id, productId) => {
    const order = await getOrderById(id);
    if (!order) {
        throw new Error('Order not found');
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Product not found');
    }

    const itemIndex = order.items.findIndex(item => item.id.equals(productId));
    if (itemIndex === -1) {
        throw new Error('Item not found in cart');
    }

    const item = order.items[itemIndex];
    if (item.quantity <= 1) {
        order.items.splice(itemIndex, 1);
    } else {
        item.quantity -= 1;
    }

    product.currentStock += 1;
    await product.save();

    order.bill = await calculateBill(order.items);

    await order.save();
    return order;
};


const cleanCart = async (id) => {
    const order = await getOrderById(id);
    if (!order) {
        throw new Error('Order not found');
    }

    for (const item of order.items) {
        const product = await Product.findById(item.id);
        if (product) {
            product.currentStock += item.quantity;
            await product.save();
        }
    }

    order.items = [];
    order.bill = 0; 

    await order.save();
    return order;
};



module.exports = {
    createOrder,
    getOrderById,
    getOrders,
    updateOrder,
    deleteOrder,
    addToCart,
    removeFromCart,
    cleanCart
};
