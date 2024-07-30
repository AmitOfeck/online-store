document.addEventListener('DOMContentLoaded', function() {
    const categorySubcategories = {
        "Dairy and Eggs": ["Milk Alternatives", "Milk Products", "Milk", "Soft Cheeses", "Hard Cheeses", "Yogurts"],
        "Fruit and Vegetables": ["Fruit", "Vegetables", "Herbs"],
        "Meat and Fish": ["Meat", "Fish", "Chicken"],
        "Sweet & Salty": ["Sweet", "Salty"],
        "Beverages": ["Juice", "Soda", "Alcohol", "Water"],
        "Frozen Produce": ["Ice Cream", "Dessert", "Frozen Meat", "Frozen Vegetables"]
    };

    const categorySelect = document.getElementById('product-category');
    const subCategorySelect = document.getElementById('product-subCategory');

    function updateSubCategoryOptions() {
        const selectedCategory = categorySelect.value;
        const subcategories = categorySubcategories[selectedCategory] || [];
        
        subCategorySelect.innerHTML = subcategories.map(sub => `<option value="${sub}">${sub}</option>`).join('');
    }

    categorySelect.addEventListener('change', updateSubCategoryOptions);

    document.getElementById('create-item-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById('product-name').value,
            category: document.getElementById('product-category').value,
            price: parseFloat(document.getElementById('product-price').value),
            currentStock: parseInt(document.getElementById('product-currentStock').value, 10),
            image: document.getElementById('product-image').value,
            subCategory: document.getElementById('product-subCategory').value,
            weight: parseFloat(document.getElementById('product-weight').value),
            weightUnit: document.getElementById('product-weightUnit').value,
            manufacturer: document.getElementById('product-manufacturer').value,
        };

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('No token found');
                return;
            }

            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            formData.supplierId = tokenPayload.userId;
            console.log('Supplier ID:', formData.supplierId);

            const response = await fetch('http://localhost:8080/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token 
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();
            if (response.ok) {
                localStorage.setItem('productData', JSON.stringify(responseData));
                window.open('itempage-template.html', '_blank');
            } else {
                alert(`Error: ${responseData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create item');
        }
    });

    // Initialize subcategory options based on the default category
    updateSubCategoryOptions();
});
