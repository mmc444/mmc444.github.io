const products = [
    {id: 1, name: 'هنر دستی ۱', price: 100000},
    {id: 2, name: 'هنر دستی ۲', price: 200000}
];
let cart = [];

function add(id) { 
    cart.push(products.find(p=>p.id===id)); 
    alert('به سبد اضافه شد!'); 
}
function checkout() { 
    alert('سلام میخوام این موارد رو سفارش بدم'); 
}
// نمایش محصولات
const grid = document.getElementById('products');
products.forEach(p => {
    grid.innerHTML += `<div class='card'><h4>${p.name}</h4><p>${p.price} تومان</p><button onclick='add(${p.id})'>افزودن</button></div>`;
});
