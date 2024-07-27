document.addEventListener('DOMContentLoaded', function() {
    // שמירת הטוקן ב-localStorage
  

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
            supplierId: document.getElementById('product-supplierId').value,
            manufacturer: document.getElementById('product-manufacturer').value,
        };

        try {
            const token = localStorage.getItem('token'); // קבלת הטוקן מ-localStorage
            if (!token) {
                alert('No token found');
                return;
            }

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
});
