let localCartData = JSON.parse(localStorage.getItem("shopping_cart"))
let soTien = 0;

// Format tiền
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + ' VNĐ';
}

// Cho vui thoai, không xài được
function check() {
    alert("Đang kiểm tra trạng thái thanh toán...");
}

// Thêm số tiền đã lấy được ở mỗi sản phẩm trên lô cồ sì to rệch
localCartData.forEach(element => {
    soTien += element[2] * element[3];
});
document.getElementById('soTien').textContent = formatCurrency(soTien);

// Random Mã Giao Dịch : 
maGiaoDich = Math.random() * 10000000000000;
document.getElementById('maGiaoDich').textContent = Math.round(maGiaoDich);

