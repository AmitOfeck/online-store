const productService = require('../services/product');
const hasAllFields = require('../middleware/hasAllFiels'); 


const createProduct = async (req, res) => {
    try {
      const requiredFields = ['category', 'name', 'supplierId', 'manufacturer', 'price', 'currentStock'];
  
      if (!hasAllFields(req, res, requiredFields)) return;
  
      const newProduct = await productService.createProduct(
        req.body.category,
        req.body.name,
        req.body.supplierId,
        req.body.manufacturer,
        req.body.price,
        req.body.currentStock,
        req.body.image
      );
  
      res.json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

const getProducts = async (req, res) => {
    const products = await productService.getProducts();
    res.json(products);
};

const getProduct = async (req, res) => {
    try {
      const product = await productService.getProductById(req.params.id);
      
      if (!product) {
        return res.status(404).json({ errors: ['Product not found'] });
      }
  
      res.json(product);
    } catch (error) {
      //console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

const updateProduct = async (req, res) => {
    try {
      const requiredFields = ['category', 'name', 'supplierId', 'manufacturer', 'price', 'currentStock'];
  
      if (!hasAllFields(req, res, requiredFields)) return;
  
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
    try {
      const product = await productService.deleteProduct(req.params.id);
      
      if (!product) {
        return res.status(404).json({ errors: ['Product not found'] });
      }
      
      res.send();
    } catch (error) {
      //console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
  };