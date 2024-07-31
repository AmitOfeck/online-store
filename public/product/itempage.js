document.addEventListener('DOMContentLoaded', function() {
    const productData = JSON.parse(localStorage.getItem('productData'));

    if (productData) {
        document.getElementById('category-link').textContent = productData.category;
        document.getElementById('sub-category-link').textContent = productData.subCategory;
        document.getElementById('product-name').textContent = productData.name;
        document.getElementById('product-image').src = productData.image;
        document.getElementById('product-price').textContent = `₪${productData.price}`;
        document.getElementById('product-manufacturer').textContent = productData.manufacturer;
        document.getElementById('product-weight').textContent = `${productData.weight} ${productData.weightUnit}`;

        document.getElementById('add-to-cart-button').addEventListener('click', function() {
            addToCart(productData._id);
        });
    } else {
        alert('No product data found');
    }

    document.addEventListener('DOMContentLoaded', function() {
        // קבל את ה-ID מה-URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
    
        if (productId) {
            // שלוף את פרטי המוצר מה-local storage לפי ה-ID
            const productData = JSON.parse(localStorage.getItem(`product-${productId}`));
    
            if (productData) {
                // הצג את פרטי המוצר
                document.getElementById('category-link').textContent = productData.category;
                document.getElementById('sub-category-link').textContent = productData.subCategory;
                document.getElementById('product-name').textContent = productData.name;
                document.getElementById('product-image').src = productData.image;
                document.getElementById('product-price').textContent = `$${productData.price}`;
                document.getElementById('product-manufacturer').textContent = productData.manufacturer;
                document.getElementById('product-weight').textContent = `${productData.weight} ${productData.weightUnit}`;
    
                // הוסף מאזין לאירוע ללחצן הוספה לעגלת הקניות
                document.getElementById('add-to-cart-button').addEventListener('click', function() {
                    addToCart(productData._id);
                });
            } else {
                alert('Product data not found in local storage');
            }
        } else {
            alert('No product ID found in URL');
        }
    });
    
    

});