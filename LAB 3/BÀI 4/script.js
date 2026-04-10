function chuanHoa() {

    let text = document.getElementById("text").value;

    // xóa khoảng trắng dư thừa
    text = text.trim().replace(/\s+/g, " ");

    // viết hoa chữ đầu mỗi câu
    text = text.replace(/(^\w|[.!?]\s*\w)/g, function(c) {
        return c.toUpperCase();
    });

    document.getElementById("ketqua").innerHTML = text;
}