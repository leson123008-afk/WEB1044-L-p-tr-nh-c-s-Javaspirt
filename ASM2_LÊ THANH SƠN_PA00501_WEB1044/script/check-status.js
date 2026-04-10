// Login
let trangThaiDangNhap = JSON.parse(localStorage.getItem("trangThaiDangNhap"));
let dangXuat = document.getElementById('logout');
let daDangNhap = false;

// Kiểm tra
if (trangThaiDangNhap === true) {
    document.getElementById("scndBar_lastChild").style.display = 'none';
    dangXuat.style.display = 'block';
    daDangNhap = true;
} else {
    document.getElementById("scndBar_lastChild").style.display = 'block';
}
// đăng xuất
dangXuat.addEventListener('click', function() {
    localStorage.setItem("trangThaiDangNhap", JSON.stringify(false));
    document.getElementById("scndBar_lastChild").style.display = 'block';
    dangXuat.style.display = 'none';
    daDangNhap = false;
});