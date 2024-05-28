const productService = require('../services/product');

const createProduct = async (req, res) => {
    const newProduct = await productService.createProduct(req.body.category, req.body.name, req.body.supplierId, req.body.manufacturer, req.body.price, req.body.currentStock, req.body.image);
    res.json(newProduct);
};

const getProducts = async (req, res) => {
    const products = await productService.getProducts();
    res.json(products);
};

const getProduct = async (req, res) => {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
        return res.status(404).json({ errors: ['Product not found'] });
    }

    res.json(product);
};

const updateProduct = async (req, res) => {
    try {
      if (!req.body.category) {
        return res.status(400).json({ message: "Category is required" });
      }
      if (!req.body.name) {
        return res.status(400).json({ message: "Name is required" });
      }
      if (!req.body.supplierId) {
        return res.status(400).json({ message: "Supplier Id is required" });
      }
      if (!req.body.manufacturer) {
        return res.status(400).json({ message: "Manufacturer is required" });
      }
      if (!req.body.price) {
        return res.status(400).json({ message: "Price is required" });
      }
      if (!req.body.currentStock) {
        return res.status(400).json({ message: "CurrentStock is required" });
      }
      // if (!req.body.image) {
      //   return res.status(400).json({ message: "Image is required" });
      // } // Maybe we will do it required
  
      const product = await productService.updateProduct(
        req.params.id,
        req.body.category,
        req.body.name,
        req.body.supplierId,
        req.body.manufacturer,
        req.body.price,
        req.body.currentStock,
        req.body.image
      );
  
      if (!product) {
        return res.status(404).json({ errors: ['Product not found'] });
      }
  
      res.json(product);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  const deleteProduct = async (req, res) => {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ errors: ['Product not found'] });
    }
  
    res.send();
  };

  module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
  };