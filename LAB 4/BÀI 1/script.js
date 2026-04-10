// Danh sách ban đầu
let shoppingList = ["Trứng", "Thịt", "Rau"];

// a) In ra số lượng mặt hàng ban đầu
console.log("Số lượng ban đầu:", shoppingList.length);

// b) Thêm "Sữa" vào cuối danh sách
shoppingList.push("Sữa");

// c) Thêm "Bánh mì" vào đầu danh sách
shoppingList.unshift("Bánh mì");

// d) Xóa mặt hàng cuối cùng và in tên mặt hàng đó
let removedItem = shoppingList.pop();
console.log("Mặt hàng bị xóa:", removedItem);

// e) In ra mặt hàng thứ 2 sau khi thay đổi
console.log("Mặt hàng thứ 2:", shoppingList[1]);