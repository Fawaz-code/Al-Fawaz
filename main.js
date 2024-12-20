// Initialize cart
const cart = new Cart();

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.querySelector('.cart-modal');
const closeCart = document.querySelector('.close-cart');
const checkoutBtn = document.querySelector('.checkout-btn');

// Event Listeners
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

cartIcon.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

checkoutBtn.addEventListener('click', () => {
    if (cart.items.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase!');
    cart.items = [];
    cart.updateTotal();
    cart.updateCartUI();
    cartModal.classList.remove('active');
});

// Render products
function renderProducts() {
    const categories = ['smartwatch', 'iphone', 'samsung', 'infinix'];
    
    categories.forEach(category => {
        const productGrid = document.querySelector(`#${category} .product-grid`);
        const categoryProducts = products.filter(product => product.category === category);
        
        productGrid.innerHTML = categoryProducts.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" onclick="cart.addItem(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    });
}

// Initialize the page
renderProducts();