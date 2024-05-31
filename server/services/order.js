const Order = require('../models/order');

const createOrder = async (customerId, items, ordered, bill) => {
    const order = new Order({
        customerId: customerId,
        items: items,
        ordered: ordered,
        bill: bill
    });

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
    order.bill = bill;

    await order.save();
    return order;
};

const deleteOrder = async (id) => {
    const order = await getOrderById(id);
    if (!order)
        return null;

    await order.remove();
    return order;
};

module.exports = {
    createOrder,
    getOrderById,
    getOrders,
    updateOrder,
    deleteOrder
};
