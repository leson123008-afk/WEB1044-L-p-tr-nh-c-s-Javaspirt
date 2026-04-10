// ===== MẢNG SẢN PHẨM =====
const products = [
  { name: "Cà phê Arabica", price: 120000, imgUrl: "images/Arabica.jpg" },
  { name: "Cà phê Robusta", price: 90000,  imgUrl: "images/Robusta.jpg" },
  { name: "Cà phê xanh",    price: 180000, imgUrl: "images/Green.jpg"   }
];

// ===== MẢNG GIỎ HÀNG =====
// Mỗi phần tử: { name, price, quantity }
const cart = [];

// ===== ĐỊNH DẠNG GIÁ =====
function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

// ===== THÊM VÀO GIỎ HÀNG =====
function addToCart(product) {
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name: product.name, price: product.price, quantity: 1 });
  }
  renderCart();
}

// ===== THAY ĐỔI SỐ LƯỢNG =====
function changeQuantity(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(name);
    return;
  }
  renderCart();
}

// ===== XOÁ KHỎI GIỎ HÀNG =====
function removeFromCart(name) {
  const index = cart.findIndex(i => i.name === name);
  if (index !== -1) cart.splice(index, 1);
  renderCart();
}

// ===== RENDER GIỎ HÀNG =====
function renderCart() {
  const cartSection = document.getElementById("cartSection");
  if (!cartSection) return;

  if (cart.length === 0) {
    cartSection.innerHTML = `<p style="text-align:center;color:#888;padding:20px;">Giỏ hàng trống.</p>`;
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const rows = cart.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${formatPrice(item.price)}</td>
      <td class="qty-cell">
        <button class="qty-btn minus" onclick="changeQuantity('${item.name}', -1)">&#8722;</button>
        <span class="qty-num">${item.quantity}</span>
        <button class="qty-btn plus" onclick="changeQuantity('${item.name}', 1)">+</button>
      </td>
      <td>${formatPrice(item.price * item.quantity)}</td>
      <td><button class="btn-xoa" onclick="removeFromCart('${item.name}')">Xoá</button></td>
    </tr>
  `).join("");

  cartSection.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Đơn giá</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="cart-footer">
      <span class="total-label">Tổng tiền: <strong>${formatPrice(total)}</strong></span>
      <button class="btn-thanhtoan" onclick="alert('Thanh toán thành công!')">Thanh toán</button>
    </div>
  `;
}

// ===== TẠO THẺ SẢN PHẨM =====
function createProductCard(product) {
  const div = document.createElement("div");
  div.classList.add("product");

  div.innerHTML = `
    <img src="${product.imgUrl}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p class="price">${formatPrice(product.price)}</p>
    <button onclick="addToCart(products.find(p => p.name === '${product.name}'))">
      Thêm giỏ hàng
    </button>
  `;

  return div;
}

// ===== RENDER DANH SÁCH SẢN PHẨM =====
const container = document.getElementById("productList");
products.forEach(product => {
  container.appendChild(createProductCard(product));
});

// Khởi tạo giỏ hàng rỗng ban đầu
renderCart();