// Portugal Shop - Interactive Logic
// Handles product rendering, cart management, and UI interactions

// ۱. داده‌های نمونه محصولات (در آینده این‌ها از دیتابیس Flask می‌آیند)
const products = [
    { id: 1, name: "پرتقال شیرین فراری", price: 45000, image: "https://images.unsplash.com/photo-1582284062244-6632067f830b?w=400" },
    { id: 2, name: "آب پرتقال تازه", price: 35000, image: "https://images.unsplash.com/photo-1613478223719-2394e39ce9a1?w=400" },
    { id: 3, name: "مربای پرتقال خانگی", price: 85000, image: "https://images.unsplash.com/photo-1589985270826-b04071246d74?w=400" },
    { id: 4, name: "کیک پرتقالی کلاسیک", price: 60000, image: "https://images.unsplash.com/photo-1515037893949-ad772363221a?w=400" },
    { id: 5, name: "شربت پرتقال خنک", price: 25000, image: "https://images.unsplash.com/photo-1556767667-075476b17b01?w=400" },
    { id: 6, name: "کنفیت پرتقال", price: 95000, image: "https://images.unsplash.com/photo-1590005024862-6b67679a9440?w=400" }
];

// ۲. وضعیت سبد خرید
let cart = [];

// ۳. انتخاب عناصر DOM
const productGrid = document.querySelector('.product-grid');
const cartDrawer = document.querySelector('.cart-drawer');
const cartOverlay = document.querySelector('.overlay');
const cartBadge = document.querySelector('.badge');
const cartItemsContainer = document.querySelector('.cart-items-container'); // باید در HTML باشد
const cartTotalElement = document.querySelector('.cart-total'); // باید در HTML باشد

// ۴. تابع برای نمایش محصولات در صفحه
function displayProducts() {
    if (!productGrid) return;
    
    productGrid.innerHTML = products.map(product => 
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius:8px; margin-bottom:10px;">
            <h3>${product.name}</h3>
            <p style="color: #ff8c00; font-weight: bold;">${product.price.toLocaleString()} تومان</p>
            <button class="btn-secondary" onclick="addToCart(${product.id})" style="margin-top:10px; width:100%;">
                افزودن به سبد
            </button>
        </div>
    ).join('');
}

// ۵. تابع افزودن به سبد خرید
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartUI();
        // یک افکت کوچک برای کاربر
        console.log(${product.name} به سبد اضافه شد.);
    }
};

// ۶. تابع بروزرسانی رابط کاربری سبد خرید
function updateCartUI() {
    // بروزرسانی تعداد روی آیکون سبد
    cartBadge.textContent = cart.length;

    // محاسبه مجموع قیمت
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // نمایش آیتم‌ها در سبد (در اینجا فقط کنسول و بدنه اصلی را آپدیت می‌کنیم)
    // نکته: در نسخه کامل، لیست HTML داخل Drawer تولید می‌شود
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = cart.map(item => 
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #333; padding-bottom:5px;">
                <span>${item.name}</span>
                <span>${item.price.toLocaleString()} تومان</span>
            </div>
        ).join('');
    }

    if (cartTotalElement) {
        cartTotalElement.textContent = ${total.toLocaleString()} تومان;
    }
}

// ۷. باز و بسته کردن سبد خرید
window.toggleCart = function() {
    cartDrawer.classList.toggle('active');
    cartOverlay.style.display = cartDrawer.classList.contains('active') ? 'block' : 'none';
};

window.closeCart = function() {
    cartDrawer.classList.remove('active');
    cartOverlay.style.display = 'none';
};

// اجرای توابع هنگام لود شدن صفحه
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    
    // بستن سبد خرید با کلیک روی لایه سیاه (Overlay)
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
});
