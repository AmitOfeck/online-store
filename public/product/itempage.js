
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
    }
});


document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
  
    if (productId) {
      try {
        const productData = await fetchData(productId);
  
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
          alert('Product data not found');
        }
      } catch (error) {
        alert('Error fetching product data');
        console.error(error);
      }
    } 
  });


async function fetchData(productId) {
    try {
      const response = await fetch(`http://localhost:8080/products/${productId}`, {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching product data: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product data:', error);
      return null;
    }
  }

  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      const userType = decodedToken.type;
      if (userType == "supplier") {
        const facebookPostButton = document.getElementById('facebook-post-button');
        facebookPostButton.style.display = 'inline-block';
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    console.log("no token");
  }

  function postOnFacebook() {
    const content = localStorage.getItem('productData');
    const productData = JSON.parse(content);

    const link = localStorage.getItem('link');
    const accessToken = "EAANiSIMXHsgBO2wpKLteaiQJbDHQsyZBi1w7fTE8oZABEQtaRYf9UPajN6VlrcrOEqp1311xKuIn34y2CKpqqTTCFRUunxpmJj7Xzq6aUK0t2OdkHZCRdrr6ZCT99uZAmslXPwTI296jZBe4GzuBZC6pKvnGdO0WvEeWoZBQuRLiWNCZAtteskNCMI39sWNprjpSrowW8wzZAS";

    if (!accessToken) {
        console.error('Message and access token are required.');
        return;
    }

     const message = `
     🌟 New Arrival Alert! 🌟
     
     We are excited to introduce our latest product: ${productData.name}!
     
     this product is now available in our store. 
     
     🏷️ Price: $${productData.price}
     📦 Current Stock: ${productData.currentStock} units
     ⚖️ Weight: ${productData.weight} ${productData.weightUnit}
     
     Don't miss out! Visit us today and get your hands on this fantastic new item.
     
     #NewProduct #${productData.category.replace(/ /g, '')} #${productData.subCategory.replace(/ /g, '')} #${productData.manufacturer.replace(/ /g, '')}
 `;

    const url = new URL("https://graph.facebook.com/v17.0/401296996394006/feed");
    url.searchParams.append("message", message);
    url.searchParams.append("access_token", accessToken);

    const requestOptions = {
        method: "POST",
        redirect: "follow"
    };

    const button = document.getElementById('facebook-post-button');
    const loader = document.getElementById('loader');

    button.disabled = true;
    loader.style.display = '';

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);

            if (result.id) {
                loader.style.display = 'none';
                button.textContent = 'Posted!';
                setTimeout(() => {
                    button.style.opacity = '0';
                    setTimeout(() => {
                        button.style.display = 'none';
                        loader.style.display = 'none'; 
                    }, 1000); 
                }, 1000);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setTimeout(() => {
                button.disabled = false;
                loader.style.display = 'none'; 
                button.classList.remove('fade');
                button.style.opacity = '1'; 
            }, 2000);
        });
}