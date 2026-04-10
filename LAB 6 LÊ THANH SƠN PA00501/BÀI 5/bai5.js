/* ============================================================
   LAB 5 – DOM Render từ mảng JSON (mở rộng từ Lab 4)
   AI (ChatGPT) gợi ý layout: Header cố định + Banner +
   Sidebar lọc bên trái + Product Grid + Cart Panel slide-in
   Sinh viên tự triển khai phần render DOM bên dưới
   ============================================================ */

// ============================================================
// 1. DỮ LIỆU JSON (mảng sản phẩm từ Lab 4 – đã mở rộng)
// ============================================================
const products = [
  {
    id: 1,
    name: "Cà phê Arabica",
    category: "arabica",
    price: 120000,
    imgUrl: "images/Arabica.jpg",
    badge: "Bán chạy",
    description: "Vị thanh, chua nhẹ, thơm hoa quả. Xuất xứ Đà Lạt."
  },
  {
    id: 2,
    name: "Cà phê Robusta",
    category: "robusta",
    price: 90000,
    imgUrl: "images/Robusta.jpg",
    badge: "",
    description: "Đậm đà, đắng mạnh, nhiều caffeine. Phù hợp pha phin."
  },
  {
    id: 3,
    name: "Cà phê xanh",
    category: "xanh",
    price: 180000,
    imgUrl: "images/Green.jpg",
    badge: "Mới",
    description: "Chưa rang, giàu chất chống oxy hoá, hỗ trợ giảm cân."
  },
  {
    id: 4,
    name: "Arabica Premium",
    category: "arabica",
    price: 220000,
    imgUrl: "images/Arabica.jpg",
    badge: "Cao cấp",
    description: "Arabica tuyển chọn, rang mộc, hương vị tinh tế."
  },
  {
    id: 5,
    name: "Robusta Culi",
    category: "robusta",
    price: 150000,
    imgUrl: "images/Robusta.jpg",
    badge: "",
    description: "Nhân culi nguyên vẹn, vị đậm đặc, sánh mịn."
  },
  {
    id: 6,
    name: "Blend Sài Gòn",
    category: "xanh",
    price: 100000,
    imgUrl: "images/Green.jpg",
    badge: "Đặc biệt",
    description: "Hỗn hợp Arabica & Robusta, hương vị cân bằng."
  }
];

// ============================================================
// 2. TRẠNG THÁI ỨNG DỤNG
// ============================================================
const cart = [];           // Mảng giỏ hàng: [{ id, name, price, quantity }]
let activeCategory = "all";
let maxPrice       = 300000;
let sortMode       = "default";

// ============================================================
// 3. UTILITY – ĐỊNH DẠNG GIÁ
// ============================================================
function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

// ============================================================
// 4. RENDER SẢN PHẨM (DOM từ template)
// ============================================================
function getFilteredProducts() {
  let list = products.filter(p => {
    const matchCat   = activeCategory === "all" || p.category === activeCategory;
    const matchPrice = p.price <= maxPrice;
    return matchCat && matchPrice;
  });

  if (sortMode === "asc")  list.sort((a, b) => a.price - b.price);
  if (sortMode === "desc") list.sort((a, b) => b.price - a.price);
  if (sortMode === "name") list.sort((a, b) => a.name.localeCompare(b.name, "vi"));

  return list;
}

function renderProducts() {
  const grid  = document.getElementById("productGrid");
  const count = document.getElementById("productCount");
  const list  = getFilteredProducts();

  // Cập nhật đếm sản phẩm
  count.textContent = `(${list.length} sản phẩm)`;

  // Xoá grid cũ
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `<p class="no-result">😔 Không tìm thấy sản phẩm phù hợp.</p>`;
    return;
  }

  // Tạo card cho từng sản phẩm bằng DOM
  list.forEach((product, index) => {
    const card = createCard(product, index);
    grid.appendChild(card);
  });
}

// TẠO 1 CARD SẢN PHẨM – SINH VIÊN TỰ XEM VÀ HIỂU CÁC BƯỚC:
function createCard(product, index) {
  // Bước 1: Tạo thẻ bao ngoài
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.animationDelay = `${index * 60}ms`;

  // Bước 2: Khu vực ảnh
  const imgWrap = document.createElement("div");
  imgWrap.classList.add("card-img-wrap");

  const img = document.createElement("img");
  img.src = product.imgUrl;
  img.alt = product.name;

  imgWrap.appendChild(img);

  // Badge (nếu có)
  if (product.badge) {
    const badge = document.createElement("span");
    badge.classList.add("card-badge");
    badge.textContent = product.badge;
    imgWrap.appendChild(badge);
  }

  // Bước 3: Phần thân card
  const body = document.createElement("div");
  body.classList.add("card-body");

  const name = document.createElement("h3");
  name.classList.add("card-name");
  name.textContent = product.name;

  const desc = document.createElement("p");
  desc.classList.add("card-desc");
  desc.textContent = product.description;

  body.appendChild(name);
  body.appendChild(desc);

  // Bước 4: Footer – giá + nút thêm giỏ
  const footer = document.createElement("div");
  footer.classList.add("card-footer");

  const price = document.createElement("span");
  price.classList.add("card-price");
  price.textContent = formatPrice(product.price);

  const btnAdd = document.createElement("button");
  btnAdd.classList.add("btn-add");
  btnAdd.textContent = "Thêm giỏ";
  btnAdd.addEventListener("click", () => addToCart(product));

  footer.appendChild(price);
  footer.appendChild(btnAdd);

  // Bước 5: Ghép lại
  card.appendChild(imgWrap);
  card.appendChild(body);
  card.appendChild(footer);

  return card;
}

// ============================================================
// 5. GIỎ HÀNG
// ============================================================
function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }
  renderCart();
  updateBadge();
  showToast(`✅ Đã thêm "${product.name}" vào giỏ`);
}

function changeQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }
  renderCart();
  updateBadge();
}

function removeFromCart(id) {
  const idx = cart.findIndex(i => i.id === id);
  if (idx !== -1) cart.splice(idx, 1);
  renderCart();
  updateBadge();
}

function renderCart() {
  const body = document.getElementById("cartBody");
  body.innerHTML = "";

  if (cart.length === 0) {
    body.innerHTML = `<p class="cart-empty">Giỏ hàng trống.</p>`;
    removeCartFooter();
    return;
  }

  // Render từng cart item
  cart.forEach(item => {
    const el = document.createElement("div");
    el.classList.add("cart-item");

    el.innerHTML = `
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${formatPrice(item.price)}</p>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn minus" data-id="${item.id}" data-delta="-1">&#8722;</button>
        <span class="qty-num">${item.quantity}</span>
        <button class="qty-btn plus"  data-id="${item.id}" data-delta="1">+</button>
      </div>
      <button class="btn-remove" data-id="${item.id}" title="Xoá">✕</button>
    `;

    // Gắn sự kiện sau khi innerHTML được set
    el.querySelectorAll(".qty-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        changeQuantity(Number(btn.dataset.id), Number(btn.dataset.delta));
      });
    });

    el.querySelector(".btn-remove").addEventListener("click", () => {
      removeFromCart(Number(item.id));
    });

    body.appendChild(el);
  });

  // Footer tổng tiền + thanh toán
  renderCartFooter();
}

function renderCartFooter() {
  removeCartFooter();
  const total   = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const panel   = document.getElementById("cartPanel");

  const footer  = document.createElement("div");
  footer.classList.add("cart-panel-footer");
  footer.id = "cartFooter";

  footer.innerHTML = `
    <div class="cart-total-row">
      <span class="cart-total-label">Tổng tiền</span>
      <span class="cart-total-value">${formatPrice(total)}</span>
    </div>
    <button class="btn-checkout" id="btnCheckout">Thanh toán</button>
  `;

  panel.appendChild(footer);

  document.getElementById("btnCheckout").addEventListener("click", () => {
    alert("🎉 Thanh toán thành công!\nCảm ơn bạn đã mua hàng tại CaféVN.");
    cart.length = 0;
    renderCart();
    updateBadge();
    closeCart();
  });
}

function removeCartFooter() {
  const old = document.getElementById("cartFooter");
  if (old) old.remove();
}

function updateBadge() {
  const total = cart.reduce((sum, i) => sum + i.quantity, 0);
  document.getElementById("cartBadge").textContent = total;
}

// ============================================================
// 6. MỞ / ĐÓNG CART PANEL
// ============================================================
function openCart() {
  document.getElementById("cartPanel").classList.add("open");
  document.getElementById("cartOverlay").classList.add("active");
}

function closeCart() {
  document.getElementById("cartPanel").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("active");
}

document.getElementById("cartToggleBtn").addEventListener("click", openCart);
document.getElementById("cartCloseBtn").addEventListener("click", closeCart);
document.getElementById("cartOverlay").addEventListener("click", closeCart);

// ============================================================
// 7. BỘ LỌC & SẮP XẾP
// ============================================================
// Lọc theo danh mục
document.querySelectorAll("input[name='category']").forEach(radio => {
  radio.addEventListener("change", () => {
    activeCategory = radio.value;
    renderProducts();
  });
});

// Lọc theo giá
const priceRange = document.getElementById("priceRange");
const priceLabel = document.getElementById("priceLabel");

priceRange.addEventListener("input", () => {
  maxPrice = Number(priceRange.value);
  priceLabel.textContent = formatPrice(maxPrice);
  renderProducts();
});

// Sắp xếp
document.getElementById("sortSelect").addEventListener("change", e => {
  sortMode = e.target.value;
  renderProducts();
});

// ============================================================
// 8. TOAST THÔNG BÁO
// ============================================================
let toastTimer = null;

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

// ============================================================
// 9. KHỞI CHẠY
// ============================================================
renderProducts();
renderCart();