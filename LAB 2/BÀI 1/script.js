function kiemtra(){
    let a = document.getElementById("number").value;

    if(a % 2 == 0){
        document.getElementById("ketqua").innerHTML = "Đây là số chẵn";
    }else{
        document.getElementById("ketqua").innerHTML = "Đây là số lẻ";
    }
}