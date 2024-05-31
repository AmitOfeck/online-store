const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
 
  customerId: {
    type: String,
    required: true
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  ordered: {
    type: Boolean,
    required: true
  },
  bill: {
    type: Number
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
