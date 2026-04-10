let loggedIn = false;

// Tạo tài khoản
function register(x) {
    event.preventDefault(); // Ngăn không cho form gửi dữ liệu lên server
    let form = x.parentElement.children;
    let username = form[0].value;
    let email = form[3].value;
    let password = form[1].value;
    let re_password = form[2].value;
    
    if ( username == '' ) {
        alert("Chưa nhập username !");
        return false;
    }
    
    if ( password == '' ) {
        alert("Chưa nhập password !");
        return false;
    }

    if ( re_password == '' ) {
        alert("Chưa nhập password ( 2 ) !");
        return false;
    }
    
    if ( email == '' ) {
        alert("Chưa nhập email !");
        return false;
    }

    if ( password != re_password ) {
        alert("Mật khẩu không trùng khớp !");
        return false;
    }

    const user = [username, password, email];
    localStorage.setItem("user", JSON.stringify(user));
    alert("Tạo tài khoản thành công");
    window.location.href = "login.html";
}

let trangThai = false;
function login(x) {
    event.preventDefault();
    let user = JSON.parse(localStorage.getItem('user'));
    let form = x.parentElement.children;
    let username = form[0].value;
    let password = form[1].value;
    console.log(username, password);
    console.log(user);
    if (username === user[0] && password === user[1]) {
        console.log("Đăng nhập thành công");
        alert("Đăng nhập thành công, đợi 1s để về trang chủ");
        trangThai = true
        localStorage.setItem("trangThaiDangNhap", JSON.stringify(trangThai));
        loggedIn = true;
        let count = 1;
        let intervalId = setInterval(function() {
            console.log(count);
            count++;
            if ( count > 0 ) {
                clearInterval(intervalId);
                console.log("Chuyển hướng")
                window.location.href = "index.html";
            }
        }, 1000); // In ra số mỗi 1 giây
    } else {
        console.log("Đăng nhập thất bại");
    }
}