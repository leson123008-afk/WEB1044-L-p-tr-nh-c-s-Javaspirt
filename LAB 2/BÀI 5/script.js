function kiemTra(){

    let n = document.getElementById("number").value;
    let soNguyenTo = true;

    if(n < 2){
        soNguyenTo = false;
    }

    for(let i = 2; i < n; i++){
        if(n % i == 0){
            soNguyenTo = false;
            break;
        }
    }

    if(soNguyenTo){
        document.getElementById("ketqua").innerHTML = n + " là số nguyên tố";
    }else{
        document.getElementById("ketqua").innerHTML = n + " không phải số nguyên tố";
    }

}