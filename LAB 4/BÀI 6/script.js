// ===== TẠO FAKE DATA 100 SINH VIÊN =====
const students = [];

const ho = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Vũ", "Đặng", "Bùi"];
const tenDem = ["Văn", "Thị", "Minh", "Hữu", "Gia", "Ngọc", "Anh"];
const ten = ["An", "Bình", "Cường", "Dũng", "Em", "Hà", "Hùng", "Khánh", "Lan", "Mai", "Nam", "Phong", "Quân", "Trang", "Vy"];

for (let i = 1; i <= 100; i++) {
    const name =
        ho[Math.floor(Math.random() * ho.length)] + " " +
        tenDem[Math.floor(Math.random() * tenDem.length)] + " " +
        ten[Math.floor(Math.random() * ten.length)];

    students.push({
        id: "SV" + String(i).padStart(3, "0"),
        name: name,
        age: Math.floor(Math.random() * 5) + 18,
        gender: Math.random() > 0.5 ? "Nam" : "Nữ",
        email: "sv" + i + "@gmail.com",
        score: (Math.random() * 5 + 5).toFixed(1)
    });
}


// ===== RENDER BẢNG =====
const table = document.getElementById("studentTable");

function render(data) {
    table.innerHTML = "";

    data.forEach(sv => {
        table.innerHTML += `
            <tr>
                <td>${sv.id}</td>
                <td>${sv.name}</td>
                <td>${sv.age}</td>
                <td>${sv.gender}</td>
                <td>${sv.email}</td>
                <td>${sv.score}</td>
            </tr>
        `;
    });
}

render(students);


// ===== TÌM KIẾM =====
const searchInput = document.createElement("input");
searchInput.placeholder = "Tìm theo tên...";
searchInput.className = "searchBox";
document.querySelector(".container").insertBefore(searchInput, table.parentElement);

searchInput.addEventListener("keyup", function () {
    const keyword = this.value.toLowerCase();

    const result = students.filter(sv =>
        sv.name.toLowerCase().includes(keyword)
    );

    render(result);
});


// ===== SẮP XẾP ĐIỂM =====
const sortBtn = document.createElement("button");
sortBtn.innerText = "Sắp xếp điểm ↓";
sortBtn.className = "btn";

document.querySelector(".container").insertBefore(sortBtn, table.parentElement);

sortBtn.onclick = function () {
    const sorted = [...students].sort((a, b) => b.score - a.score);
    render(sorted);
};


// ===== LỌC SINH VIÊN GIỎI =====
const goodBtn = document.createElement("button");
goodBtn.innerText = "Sinh viên giỏi (>8)";
goodBtn.className = "btn";

document.querySelector(".container").insertBefore(goodBtn, table.parentElement);

goodBtn.onclick = function () {
    const good = students.filter(sv => sv.score >= 8);
    render(good);
};