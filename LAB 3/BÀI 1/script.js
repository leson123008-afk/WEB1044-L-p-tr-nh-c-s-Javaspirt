function isEven(n) {
    return n % 2 === 0;
}

function checkEven() {
    let n = document.getElementById("number").value;

    if (n === "") {
        document.getElementById("result").innerHTML = "Vui lòng nhập số";
        return;
    }

    n = Number(n);

    if (isEven(n)) {
        document.getElementById("result").innerHTML = n + " là số chẵn";
    } else {
        document.getElementById("result").innerHTML = n + " là số lẻ";
    }
}