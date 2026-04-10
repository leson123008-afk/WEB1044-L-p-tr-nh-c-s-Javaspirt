let str = '';
let str2 = '';

let shoppingCartCounting = parseInt(localStorage.getItem("shoppingCartCounting")) || 0;
document.getElementById('shoppingCartCounting').textContent = shoppingCartCounting;

const listSp = [
    {hinh: 'hoa1.jpg', ten: 'Bó hoa tươi tặng sinh nhật đẹp', gia: '280,000₫'},
    {hinh: 'hoa2.jpg', ten: 'Bó hoa hồng sinh nhật giá rẻ đẹp', gia: '300,000₫'},
    {hinh: 'hoa3.jpg', ten: 'Hoa Sinh Nhật Bó Hoa Sinh Nhật Baby Hồng Kem', gia: '430,000₫'},
    {hinh: 'hoa4.jpg', ten: 'Bó Hoa Cúc Mẫu Đơn Tím Sang Trọng', gia: '220,000₫'},
    {hinh: 'hoa5.jpg', ten: 'Bó Hoa Sinh Nhật Hồng Kem Cát Xoăn', gia: '255,000₫'},
    {hinh: 'hoa6.jpg', ten: 'Bó Hoa Hồng Đỏ Sinh Nhật Thuỷ Tiên', gia: '270,000₫'},
    {hinh: 'hoa7.jpg', ten: 'Giỏ hoa tươi khai trương đại phát', gia: '260,000₫'},
    {hinh: 'hoa8.webp', ten: 'Lẵng Hoa Sinh Nhật Gỗ Sang Trọng', gia: '299,000₫'},
    {hinh: 'hoa9.jpg', ten: 'Kệ hoa Mini Sinh Nhật Lịch Lãm', gia: '350,000₫'},
    {hinh: 'hoa10.jpg', ten: 'Kệ Hoa Mini Hồng Môn Xanh Tươi Sáng', gia: '200,000₫'},
];
console.log("Danh sách sản phầm có", listSp.length, "sản phẩm");

for ( let i = 0; i < 5; i++ ) {
    str += `
    <div class="showcase">
        <img src="/img/${listSp[i].hinh}" alt="">
        <h4>${listSp[i].ten}</h4>
        <h3>${listSp[i].gia}</h3>
        <button onclick="addToCart(this)">Thêm vào giỏ hàng</button>
        <img src="/img/new-tag.png" alt="">
    </div>
    `
}

for ( let i = 5; i < 10; i++ ) {
    str2 += `
    <div class="showcase">
        <img src="/img/${listSp[i].hinh}" alt="">
        <h4>${listSp[i].ten}</h4>
        <h3>${listSp[i].gia}</h3>
        <button onclick="addToCart(this)">Thêm vào giỏ hàng</button>
        <img src="/img/new-tag.png" alt="">
    </div>
    `
}
document.getElementById("firstList").innerHTML = str;
document.getElementById("secondList").innerHTML = str2;

let logoVuonHoaTuoi = document.getElementById('logoVuonHoaTuoi').parentElement.children[1];

logoVuonHoaTuoi.addEventListener('click', () => {
    window.location.href = '/index.html';
})


// Thêm "tính năng này đang phát triển" cho các button
let socialMedia = document.getElementById('socialMedia');
let socialMediaList = socialMedia.children;
for (let i = 0; i < socialMediaList.length; i++) {
    if (i < 6 ) { 
        socialMediaList[i].addEventListener('click', () => {
            window.alert("Tính năng này đang phát triển");
        });
    }
}

// Ấn vào div thì chuyển trang
// Thêm sự kiện click cho tất cả các phần tử .showcase
document.querySelectorAll('.showcase').forEach(item => {
    item.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') {
            window.location.href = '/item-information.html';
        }
    });
});

// Thêm sự kiện click cho tất cả các button bên trong .showcase
document.querySelectorAll('.showcase button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        localStorage.setItem("shoppingCartCounting", shoppingCartCounting)
        document.getElementById('shoppingCartCounting').textContent = shoppingCartCounting;
    });
});

function sc(x) {
    localStorage.setItem("shoppingCartCounting", x);
}

function sc() {
    localStorage.clear();
    window.location.reload();
    console.log("Đã reset toàn bộ hệ thống giỏ hàng");
}