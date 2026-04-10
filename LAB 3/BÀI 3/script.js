function tinhLuong() {

    let heso = Number(document.getElementById("chucvu").value);
    let ngaycong = Number(document.getElementById("ngaycong").value);

    const luongCoBan = 5000000;
    const ngayQuyDinh = 24;

    let luong = heso * ngaycong * (luongCoBan / ngayQuyDinh);

    document.getElementById("ketqua").innerHTML =
        "Lương nhân viên: " + luong.toLocaleString() + " VNĐ";
}