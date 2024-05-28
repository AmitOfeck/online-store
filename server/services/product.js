const Product = require('../models/product');

const createProduct = async (category, name, supplierId, manufacturer, price, currentStock, image) => {
    const product = new Product({
        category : category,
        name : name,
        supplierId : supplierId,
        manufacturer : manufacturer,
        price : price,
        currentStock : currentStock,
        image : image,
    });

    return await product.save();
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const getProducts = async () => {
    return await Product.find({});
};

const updateProduct = async (id, category, name, supplierId, manufacturer, price, currentStock, image) => {
    const product = await getProductById(id);
     if (!product)
        return null;

        product.category = category;
        product.name = name;
        product.supplierId = supplierId;
        product.manufacturer = manufacturer;
        product.price = price;
        product.currentStock = currentStock;
        product.image = image;

    await product.save();
    return product;
};

const deleteProduct = async (id) => {
    const product = await getProductById(id);
    if (!product)
        return null;

    await product.remove();
    return product;
};

module.exports = {
    createProduct,
    getProductById,
    getProducts,
    updateProduct,
    deleteProduct
}