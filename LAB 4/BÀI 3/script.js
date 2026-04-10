// Danh sách sinh viên
const students = [
 { name: "An", score: 8.2 },
 { name: "Bình", score: 7.5 },
 { name: "Chi", score: 9.1 },
 { name: "Duy", score: 6.8 },
 { name: "Hà", score: 8.7 },
 { name: "Khánh", score: 5.9 },
 { name: "Lan", score: 7.8 },
 { name: "Minh", score: 9.4 },
 { name: "Ngọc", score: 6.5 },
 { name: "Quân", score: 8.0 }
];


// a. Lọc học sinh có điểm > 8
let diemCao = students.filter(function(sv){
    return sv.score > 8;
});
console.log("Học sinh điểm > 8:", diemCao);


// b. Tìm học sinh có điểm cao nhất
let maxStudent = students.reduce(function(max, sv){
    return sv.score > max.score ? sv : max;
});
console.log("Học sinh điểm cao nhất:", maxStudent);


// c. Tính điểm trung bình của lớp
let tong = students.reduce(function(sum, sv){
    return sum + sv.score;
},0);

let diemTB = tong / students.length;
console.log("Điểm trung bình lớp:", diemTB.toFixed(2));


// d. Tạo mảng chỉ chứa tên học sinh
let tenHocSinh = students.map(function(sv){
    return sv.name;
});
console.log("Danh sách tên:", tenHocSinh);


// e. Sắp xếp danh sách theo điểm giảm dần
let sapXep = [...students].sort(function(a,b){
    return b.score - a.score;
});
console.log("Danh sách sắp xếp giảm dần:", sapXep);