const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    category: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      supplierId: {
        type: String,
        required: true
      },
      manufacturer: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true,
        min: 0
      },
      currentStock: {
        type: Number,
        required: true,
        min: 0
      },
      image: {
        type: String
      }
});

module.exports = mongoose.model('Product', Product);