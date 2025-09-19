// ====== Mobile Menu Toggle ======
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true" || false;
  menuToggle.setAttribute("aria-expanded", !expanded);
  mainNav.classList.toggle("show");
});

// ====== Cart Modal Logic ======
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let cart = [];

// Open Cart
cartBtn.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
});

// Close Cart
closeCart.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

// Checkout (just clears cart for demo)
checkoutBtn.addEventListener("click", () => {
  alert("Checkout successful! (Demo only)");
  cart = [];
  updateCartUI();
  cartModal.classList.add("hidden");
});

// ====== Featured Products (Demo Data) ======
const featuredList = document.getElementById("featured-list");

const products = [
  { id: 1, name: "Maize (90kg Bag)", price: 2800 },
  { id: 2, name: "Tea Leaves (per kg)", price: 350 },
  { id: 3, name: "Dairy Milk (per litre)", price: 60 },
  { id: 4, name: "Fertilizer (50kg Bag)", price: 4500 },
];

// Render featured products
function renderFeatured() {
  featuredList.innerHTML = "";
  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "feature";
    card.innerHTML = `
      <h4>${p.name}</h4>
      <p>Price: KSh ${p.price.toLocaleString()}</p>
      <button class="btn small" onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    featuredList.appendChild(card);
  });
}
renderFeatured();

// ====== Cart Functions ======
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} (x${item.qty})</span>
      <strong>KSh ${(item.price * item.qty).toLocaleString()}</strong>
      <button onclick="removeFromCart(${item.id})" class="btn ghost small">Remove</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartCount.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
  cartTotal.textContent = "KSh " + total.toLocaleString();
}
