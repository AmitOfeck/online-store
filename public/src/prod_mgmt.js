const productTable = document.getElementById('productTable');
    const searchProduct = document.getElementById('searchProduct');
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductModal = new bootstrap.Modal(document.getElementById('addProductModal'));
    const addProductForm = document.getElementById('addProductForm');
    let products = [];

    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:8080/products/', {
          method: 'GET',
          headers: {
            'Authorization': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }

        products = await response.json();
        renderProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    function renderProducts(products) {
      productTable.innerHTML = '';
      products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${product.productName}</td>
          <td>${product.productId}</td>
          <td>
            <input type="number" class="form-control" value="${product.productPrice}" onchange="updateProductPrice('${product.productId}', this.value)">
            <button class="btn btn-success btn-sm" onclick="saveProductPrice('${product.productId}', this.previousElementSibling.value)"><i class="bi bi-check"></i></button>
          </td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.productId}')"><i class="bi bi-x"></i></button></td>
        `;
        productTable.appendChild(row);
      });
    }

    async function saveProductPrice(productId, newPrice) {
      try {
        const response = await fetch(`http://localhost:8080/products/${productId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productPrice: newPrice })
        });

        if (!response.ok) {
          throw new Error(`Error updating product price: ${response.statusText}`);
        }

        const updatedProduct = await response.json();
        const index = products.findIndex(p => p.productId === productId);
        products[index].productPrice = updatedProduct.productPrice;
        renderProducts(products);
      } catch (error) {
        console.error('Error updating product price:', error);
      }
    }

    async function deleteProduct(productId) {
      try {
        const response = await fetch(`http://localhost:8080/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error deleting product: ${response.statusText}`);
        }

        products = products.filter(product => product.productId !== productId);
        renderProducts(products);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }

    searchProduct.addEventListener('input', () => {
      const searchText = searchProduct.value.toLowerCase();
      const filteredProducts = products.filter(product => 
        product.productName.toLowerCase().includes(searchText) ||
        product.productId.toLowerCase().includes(searchText)
      );
      renderProducts(filteredProducts);
    });

    addProductBtn.addEventListener('click', () => {
      addProductModal.show();
    });

    addProductForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const productName = document.getElementById('productName').value;
      const productPrice = document.getElementById('productPrice').value;
      try {
        const response = await fetch('http://localhost:8080/products/', {
          method: 'POST',
          headers: {
            'Authorization': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productName, productPrice })
        });

        if (!response.ok) {
          throw new Error(`Error adding product: ${response.statusText}`);
        }

        const newProduct = await response.json();
        products.push(newProduct);
        renderProducts(products);
        addProductModal.hide();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    });

    // Initial fetch and render
    fetchProducts();