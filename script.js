// ---------- Product data ----------
const products = [
  { name: "Trail 29er", category: "mountain",    price: 18500, emoji: "🚵" },
  { name: "Rockhopper X",     category: "mountain",    price: 22900, emoji: "⛰️" },
  { name: "Velocity Road Pro", category: "road",       price: 27500, emoji: "🚴" },
  { name: "Aero Speed 700",   category: "road",        price: 31000, emoji: "🏁" },
  { name: "Urban Cruiser",    category: "city",        price: 12500, emoji: "🌆" },
  { name: "Commuter Lite",    category: "city",        price: 9800,  emoji: "🚲" },
  { name: "Safety Helmet",    category: "accessories", price: 1200,  emoji: "⛑️" },
  { name: "LED Light Set",    category: "accessories", price: 650,   emoji: "💡" },
  { name: "Heavy-Duty Lock",  category: "accessories", price: 800,   emoji: "🔒" },
];

const grid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
let cart = 0;

// ---------- Render products ----------
function renderProducts(filter = "all") {
  grid.innerHTML = "";
  products
    .filter(p => filter === "all" || p.category === filter)
    .forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="emoji">${p.emoji}</div>
        <h3>${p.name}</h3>
        <div class="price">₱${p.price.toLocaleString()}</div>
        <button class="btn add-btn">Add to Cart</button>`;
      card.querySelector(".add-btn").addEventListener("click", () => {
        cart++;
        cartCount.textContent = cart;
      });
      grid.appendChild(card);
    });
}

// ---------- Filter buttons ----------
document.getElementById("filters").addEventListener("click", e => {
  if (!e.target.classList.contains("filter")) return;
  document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  renderProducts(e.target.dataset.filter);
});

// ---------- Mobile menu ----------
const nav = document.getElementById("nav");
document.getElementById("menuToggle").addEventListener("click", () => nav.classList.toggle("open"));
nav.addEventListener("click", () => nav.classList.remove("open"));

// ---------- Contact form validation ----------
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const error = document.getElementById("formError");
  const success = document.getElementById("formSuccess");
  error.textContent = success.textContent = "";

  if (!name || !email || !message) {
    error.textContent = "Please fill in all fields.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.textContent = "Please enter a valid email address.";
    return;
  }
  success.textContent = `Thanks, ${name}! We'll get back to you soon.`;
  e.target.reset();
});

renderProducts();
