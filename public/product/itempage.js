document.addEventListener('DOMContentLoaded', function() {
    const productData = JSON.parse(localStorage.getItem('productData'));

    if (productData) {
        document.getElementById('category-link').textContent = productData.category;
        document.getElementById('sub-category-link').textContent = productData.subCategory;
        document.getElementById('product-name').textContent = productData.name;
        document.getElementById('product-image').src = productData.image;
        document.getElementById('product-price').textContent = `$${productData.price}`;
        document.getElementById('product-manufacturer').textContent = productData.manufacturer;
        document.getElementById('product-weight').textContent = `${productData.weight} ${productData.weightUnit}`;

        document.getElementById('add-to-cart-button').addEventListener('click', function() {
            addToCart(productData._id);
        });
    } else {
        alert('No product data found');
    }
});