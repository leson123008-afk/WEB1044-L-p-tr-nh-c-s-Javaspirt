// Mảng sản phẩm
const products = [
  { name: "Cà phê Arabica", price: 120000, imgUrl: "images/Arabica.jpg" },
  { name: "Cà phê Robusta", price: 90000,  imgUrl: "images/Robusta.jpg" },
  { name: "Cà phê xanh",    price: 180000, imgUrl: "images/Green.jpg"   }
];

// Hàm định dạng giá: 120000 → "120.000đ"
function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

// Hàm tạo thẻ sản phẩm
function createProductCard(product) {
  const div = document.createElement("div");
  div.classList.add("product");

  div.innerHTML = `
    <img src="${product.imgUrl}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p class="price">${formatPrice(product.price)}</p>
    <button onclick="alert('Đã thêm "${product.name}" vào giỏ hàng!')">
      Thêm giỏ hàng
    </button>
  `;

  return div;
}

// Render tất cả sản phẩm vào #productList
const container = document.getElementById("productList");

products.forEach(function (product) {
  const card = createProductCard(product);
  container.appendChild(card);
});