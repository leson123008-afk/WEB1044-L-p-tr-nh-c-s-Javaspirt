function hienBang(){

    let kq = "";

    for(let i = 2; i <= 9; i++){
        kq += "<h3>Bảng " + i + "</h3>";

        for(let j = 1; j <= 10; j++){
            kq += i + " x " + j + " = " + (i*j) + "<br>";
        }

        kq += "<br>";
    }

    document.getElementById("ketqua").innerHTML = kq;
}