// ====== Mobile Menu Toggle ======
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("show");
  });
}

// ====== Product Data (Marketplace) ======
const products = [
  { id: 1, name: "Maize (50kg bag)", price: 3200, img: "images/maize.jpg" },
  { id: 2, name: "Tea Leaves (kg)", price: 450, img: "images/tea.jpg" },
  { id: 3, name: "Fresh Dairy Milk (litre)", price: 60, img: "images/milk.jpg" },
  { id: 4, name: "Organic Fertilizer (bag)", price: 1500, img: "images/fertilizer.jpg" },
  { id: 5, name: "Farm Tools Set", price: 2500, img: "images/tools.jpg" }
];

// ====== Advisory Data ======
const advisory = [
  { id: 1, title: "Maize Farming Tips", desc: "Best planting season, pest control and harvesting advice.", img: "images/maize-advice.jpg" },
  { id: 2, title: "Tea Crop Management", desc: "Guidelines for pruning, plucking cycles and soil care.", img: "images/tea-advice.jpg" },
  { id: 3, title: "Dairy Cow Care", desc: "Feeding routines, disease management and milk hygiene.", img: "images/dairy-advice.jpg" },
  { id: 4, title: "Fertilizer Use", desc: "How to apply fertilizer effectively without harming soil.", img: "images/fertilizer-advice.jpg" }
];

// ====== Render Products ======
function renderProducts(listId) {
  const container = document.getElementById(listId);
  if (container) {
    container.innerHTML = products.map(p => `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="price">KES ${p.price}</p>
        <button onclick="addToCart(${p.id})" class="btn">Add to Cart</button>
      </div>
    `).join("");
  }
}

// ====== Render Advisory ======
function renderAdvisory(listId) {
  const container = document.getElementById(listId);
  if (container) {
    container.innerHTML = advisory.map(a => `
      <div class="advisory-card">
        <img src="${a.img}" alt="${a.title}">
        <h3>${a.title}</h3>
        <p>${a.desc}</p>
        <button class="btn ghost" onclick="alert('Contact an expert for more on ${a.title}')">Learn More</button>
      </div>
    `).join("");
  }
}

// ====== Cart Logic ======
let cart = [];

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCartUI();
}

function updateCartUI() {
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (cartCount) cartCount.textContent = cart.length;

  if (cartItems) {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        ${item.name} - KES ${item.price}
      </div>
    `).join("");
  }

  if (cartTotal) {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `KES ${total}`;
  }
}

// ====== Cart Modal ======
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");

if (cartBtn && cartModal && closeCart) {
  cartBtn.addEventListener("click", () => cartModal.classList.remove("hidden"));
  closeCart.addEventListener("click", () => cartModal.classList.add("hidden"));
}

// ====== Checkout Simulation ======
const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    alert("Checkout successful! (Simulation)");
    cart = [];
    updateCartUI();
    cartModal.classList.add("hidden");
  });
}

// ====== Initialize ======
document.addEventListener("DOMContentLoaded", () => {
  renderProducts("featured-list");
  renderProducts("product-list");
  renderAdvisory("advisory-list");
});

