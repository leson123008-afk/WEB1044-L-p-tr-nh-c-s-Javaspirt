function tinhTienDien(kwh) {
    let tien = 0;

    if (kwh <= 50) {
        tien = kwh * 1800;
    } 
    else if (kwh <= 100) {
        tien = 50 * 1800 + (kwh - 50) * 2300;
    } 
    else {
        tien = 50 * 1800 + 50 * 2300 + (kwh - 100) * 3000;
    }

    return tien;
}

function tinhTien() {
    let kwh = document.getElementById("kwh").value;
    kwh = Number(kwh);

    let tien = tinhTienDien(kwh);

    document.getElementById("ketqua").innerHTML =
        "Tiền điện phải trả: " + tien.toLocaleString() + " VNĐ";
}

// kiểm tra nhà đóng 910000đ dùng bao nhiêu điện
let tien = 910000;
let kwh = tien / 3000;

console.log("Nếu trả 910000đ thì dùng khoảng: " + kwh + " kWh");