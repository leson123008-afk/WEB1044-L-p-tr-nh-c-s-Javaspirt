// Flash Sale
setInterval(function () {
    let saleDate = new Date('2024-09-02 00:00').getTime();// .getTime() chuyển thời gian về dạng mili giây tính từ ngày 1/1/1970
    let nowTime = new Date().getTime();
    let distance = saleDate - nowTime;
    let ngay = distance/(24*60*60*1000)
    let gio = distance/(60*60*1000)
    let phut = distance/(60*1000)
    let giay = distance/(1000)

    gio %= 24;
    phut %= 60;
    giay %= 60;

    // console.log(ngay.toFixed(0), gio.toFixed(0), phut.toFixed(0), giay.toFixed(0))
    document.getElementById('ngay').innerHTML = ngay.toFixed(0) + " Ngày";
    document.getElementById('gio').innerHTML = gio.toFixed(0) + " Giờ";
    document.getElementById('phut').innerHTML = phut.toFixed(0) + " Phút";
    document.getElementById('giay').innerHTML = giay.toFixed(0) + " Giây";
}, 1000);