// Sample product data (replace with your actual data source)
const products = [
  { id: 1, name: 'Hammer', price: 10.99 },
  { id: 2, name: 'Saw', price: 24.50 },
  { id: 3, name: 'Nails (box)', price: 5.00 },
];

// Function to add product to cart (refer to previous example)
function addToCart(productId, quantity) {
  let cartItems = localStorage.getItem('cartItems');
  cartItems = cartItems ? JSON.parse(cartItems) : [];

  const existingItem = cartItems.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ productId, quantity });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to retrieve cart items from localstorage (refer to previous example)
function getCartItems() {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
}

// Function to display cart items (refer to previous example)
function updateCartDisplay() {
  const cartItems = getCartItems();
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = ''; // Clear previous cart items

  if (cartItems.length === 0) {
    cartList.innerHTML = '<li>Your cart is empty.</li>';
  } else {
    cartItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} (Qty: ${item.quantity})`;
      cartList.appendChild(listItem);
    });
  }
}

// Function to populate product list dynamically
function displayProducts() {
  const productList = document.getElementById('products');
  products.forEach(product => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${product.name}</span> - 
      <span>$${product.price.toFixed(2)}</span>
      <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(listItem);
  });
}

listItem.innerHTML = `
  <span>${product.name}</span> - 
  <span>$${product.price.toFixed(2)}</span>
  <input type="number" min="1" value="1" class="quantity-input">
  <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
`;

// Productlist function:
const productList = document.getElementById('products');
productList.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart-btn')) {
    const productId = event.target.dataset.productId;
    const quantityInput = event.target.parentElement.querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value, 10); // Parse input value to number
    if (isNaN(quantity) || quantity < 1) {
      // Handle invalid quantity (optional: display error message)
      console.error('Invalid quantity');
      return;
    }
    addToCart(productId, quantity);
    updateCartDisplay();
  }
});

