const products = [
    { name: "Laptop", price: 1200 },
    { name: "Mouse", price: 30 },
    { name: "Keyboard", price: 75 },
    { name: "Monitor", price: 300 },
];

// a. Sắp xếp mảng products theo giá tăng dần
const sortedProducts = [...products].sort((a, b) => a.price - b.price);

// b. In ra mảng sản phẩm đã được sắp xếp
console.log("Mảng sản phẩm sau khi sắp xếp:");
sortedProducts.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}: $${product.price}`);
});

// Hiển thị lên bảng HTML
const tbody = document.getElementById("productTable");
sortedProducts.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${index + 1}</td>
    <td>${product.name}</td>
    <td>$${product.price}</td>
  `;
    tbody.appendChild(row);
});