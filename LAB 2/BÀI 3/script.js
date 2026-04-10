function tinhLuong(){

    let heso = document.getElementById("chucvu").value;
    let ngay = document.getElementById("ngaycong").value;

    let luongCoBan = 5000000;
    let ngayQuyDinh = 24;

    let luong = heso * ngay * (luongCoBan / ngayQuyDinh);

    document.getElementById("ketqua").innerHTML =
    "Lương nhân viên: " + luong.toLocaleString() + " VNĐ";

}