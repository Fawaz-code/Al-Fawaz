class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        
        this.updateTotal();
        this.updateCartUI();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateTotal();
        this.updateCartUI();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.updateTotal();
            this.updateCartUI();
        }
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        const cartItems = document.querySelector('.cart-items');
        const totalAmount = document.querySelector('.total-amount');
        
        // Update cart count
        cartCount.textContent = this.items.reduce((sum, item) => sum + item.quantity, 0);
        
        // Update cart items
        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
                </div>
                <button onclick="cart.removeItem(${item.id})">×</button>
            </div>
        `).join('');
        
        // Update total
        totalAmount.textContent = `$${this.total.toFixed(2)}`;
    }
}