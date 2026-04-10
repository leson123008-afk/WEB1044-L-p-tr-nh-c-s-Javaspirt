// Mảng ban đầu
let numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// a) Tạo mảng chỉ chứa số chẵn
let evenNumbers = numbers.filter(function(num){
    return num % 2 === 0;
});

console.log("Mảng số chẵn:", evenNumbers);

// b) Nhân đôi các số chẵn
let doubledEvenNumbers = evenNumbers.map(function(num){
    return num * 2;
});

console.log("Mảng số chẵn sau khi nhân đôi:", doubledEvenNumbers);