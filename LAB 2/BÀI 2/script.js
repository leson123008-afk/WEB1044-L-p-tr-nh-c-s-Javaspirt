function tinhTien(){

    let kwh = document.getElementById("kwh").value;
    let tien = 0;

    if(kwh <= 50){
        tien = kwh * 1800;
    }
    else if(kwh <= 100){
        tien = kwh * 2300;
    }
    else{
        tien = kwh * 3000;
    }

    document.getElementById("ketqua").innerHTML = "Tiền điện: " + tien + " VNĐ";
}