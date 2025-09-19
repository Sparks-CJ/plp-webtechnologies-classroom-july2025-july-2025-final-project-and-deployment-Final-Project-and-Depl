// --- Sample Products ---
const products = [
  { id: 1, name: "Maize (90kg bag)", price: 2800, category: "maize", img: "images/maize.jpg" },
  { id: 2, name: "Green Tea Leaves (kg)", price: 400, category: "tea", img: "images/tea.jpg" },
  { id: 3, name: "Fresh Milk (liter)", price: 60, category: "dairy", img: "images/milk.jpg" },
  { id: 4, name: "Fertilizer (50kg)", price: 3500, category: "fertilizer", img: "images/fertilizer.jpg" },
  { id: 5, name: "Maize Flour (2kg)", price: 150, category: "maize", img: "images/flour.jpg" },
  { id: 6, name: "Processed Tea (packet)", price: 250, category: "tea", img: "images/teapacket.jpg" },
];

// --- Cart State ---
let cart = [];

// --- DOM Elements ---
const productList = document.getElementById("product-list");
const featuredList = document.getElementById("featured-list");
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

// --- Render Products ---
function renderProducts(list, targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;

  container.innerHTML = "";
  list.forEach(p => {
    const item = document.createElement("div");
    item.className = "product-card";
    item.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>KES ${p.price.toLocaleString()}</p>
      <button class="btn small" onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(item);
  });
}

// --- Filter Products ---
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    if (category === "all") {
      renderProducts(products, "product-list");
    } else {
      renderProducts(products.filter(p => p.category === category), "product-list");
    }
  });
});

// --- Cart Functions ---
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <span>${item.name} (x${item.qty})</span>
      <strong>KES ${(item.price * item.qty).toLocaleString()}</strong>
      <button class="btn small ghost" onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartItems.appendChild(row);
  });

  cartTotal.textContent = `KES ${total.toLocaleString()}`;
  cartCount.textContent = count;
}

// --- Modal Handling ---
if (cartBtn && cartModal) {
  cartBtn.addEventListener("click", () => {
    cartModal.classList.remove("hidden");
  });

  closeCart.addEventListener("click", () => {
    cartModal.classList.add("hidden");
  });

  checkoutBtn.addEventListener("click", () => {
    alert("Checkout process simulated. Thank you for using WakulimaHub!");
    cart = [];
    updateCart();
    cartModal.classList.add("hidden");
  });
}

// --- Menu Toggle (Mobile) ---
const menuToggle = document.getElementById("menuToggle");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const nav = document.querySelector(".main-nav");
    nav.classList.toggle("open");
  });
}

// --- Initial Render ---
renderProducts(products, "product-list");   // Marketplace
renderProducts(products.slice(0, 3), "featured-list"); // Homepage


