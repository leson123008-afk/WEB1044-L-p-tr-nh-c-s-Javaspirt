const cart = [];
// My Shopping Cart
function addToCart(button) {
    if (daDangNhap) {
        let check = true;
        let div = button.parentElement.children;
        let hinh = div[0].src;
        let name = div[1].innerHTML;
        let cost1 = div[2].innerHTML;
        let cost = cost1.split(".").join("");
        cost = cost.split("&nbsp;₫").join("");  
        cost = parseInt(cost) * 1000;
        let quantity = 1;
        let item = [hinh, name, cost, quantity];

        // Kiểm tra và tải giỏ hàng từ localStorage
        let storedCart = JSON.parse(localStorage.getItem("shopping_cart")) || [];
        
        // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
        for (let i = 0; i < storedCart.length; i++) {
            if (storedCart[i][1] === name) {
                check = false;
                storedCart[i][3] += quantity;
                break;
            }
        }

        // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào
        if (check) {
            storedCart.push(item);
        }

        // Cập nhật giỏ hàng trong localStorage
        localStorage.setItem("shopping_cart", JSON.stringify(storedCart));
        
        // Đồng bộ lại biến `cart` từ `localStorage`
        cart.length = 0; // Xóa dữ liệu cũ trong `cart`
        cart.push(...storedCart); // Đồng bộ `cart` với `storedCart`

        console.log(cart);
        
        // Cập nhật số lượng sản phẩm trong giỏ hàng
        shoppingCartCounting += 1;
        scc(shoppingCartCounting);
    } else {
        alert("Vui lòng đăng nhập để làm được điều đó!");
    }
}

// Format tiền
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + ' VNĐ';
}

function showCart() {
    // Đồng bộ lại biến `cart` từ `localStorage`
    let storedCart = JSON.parse(localStorage.getItem("shopping_cart")) || [];
    cart.length = 0; // Xóa dữ liệu cũ trong `cart`
    cart.push(...storedCart); // Đồng bộ `cart` với `storedCart`

    let tongTien = 0;
    let row = '';
    for (let i = 0; i < cart.length; i++) {
        let thanhTien = cart[i][2] * cart[i][3];
        row += `
            <tr>
                <td>${i+1}</td>
                <td><img src=${cart[i][0]}></td>
                <td>${cart[i][1]}</td>
                <td>${cart[i][2].toLocaleString('vi-vn', {style: 'currency', currency: 'VND'})}</td>
                <td>${cart[i][3]}</td>
                <td>${thanhTien.toLocaleString('vi-vn', {style: 'currency', currency: 'VND'})}</td>
                <td><i class="fa-solid fa-trash-can" onclick="deleteItem(this, ${i})"></i></td>
            </tr>
        `;
        tongTien += thanhTien;
    }

    // document.getElementById('cart').style.display = cart.length > 0 ? 'block' : 'none';
    document.getElementById('tb').innerHTML = row;
    document.getElementById('sum').innerHTML = tongTien.toLocaleString('vi-vn', {style: 'currency', currency: 'VND'});
}

function deleteItem(x, i) {
    // Xóa mục từ giỏ hàng
    cart.splice(i, 1);
    
    // Cập nhật lại `localStorage`
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
    
    // Cập nhật lại giao diện giỏ hàng
    showCart();
    
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    shoppingCartCounting -= 1;
    scc(shoppingCartCounting);
}


function scc(x) {
    localStorage.setItem("shoppingCartCounting", x);
}

function sc() {
    localStorage.setItem("shoppingCartCounting", 0);
    localStorage.removeItem("shopping_cart");
    window.location.reload();
    console.log("Đã reset toàn bộ hệ thống giỏ hàng");
}

// Load giỏ hàng từ localStorage khi trang được tải lại
window.onload = function() {
    let storedCart = JSON.parse(localStorage.getItem("shopping_cart"));
    if (storedCart && storedCart.length > 0) {
        storedCart.forEach(item => cart.push(item));
        showCart();
    }
}