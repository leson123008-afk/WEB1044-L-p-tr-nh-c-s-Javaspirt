// ================== DỮ LIỆU SẢN PHẨM ==================
const products = [
    {
        id: 1,
        name: "Cà phê Arabica",
        price: 120000,
        image: "https://picsum.photos/id/201/600/400"
    },
    {
        id: 2,
        name: "Cà phê Robusta",
        price: 90000,
        image: "https://picsum.photos/id/237/600/400"
    },
    {
        id: 3,
        name: "Cà phê xanh",
        price: 180000,
        image: "https://picsum.photos/id/180/600/400"
    }
];

// Format giá tiền Việt Nam
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + 'đ / đ/kg';
}

// Tạo card sản phẩm
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;

    const isLiked = localStorage.getItem(`liked_${product.id}`) === 'true';

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <div class="like-icon ${isLiked ? 'liked' : ''}" data-id="${product.id}">
                ${isLiked ? '❤️' : '♡'}
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${formatPrice(product.price)}</p>
            <button class="btn">🛒 Thêm giỏ hàng</button>
        </div>
    `;

    // Sự kiện click trái tim like / unlike
    const likeBtn = card.querySelector('.like-icon');
    likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        const productId = parseInt(likeBtn.dataset.id);
        const currentlyLiked = likeBtn.classList.contains('liked');

        if (currentlyLiked) {
            // Bỏ thích
            likeBtn.classList.remove('liked');
            likeBtn.innerHTML = '♡';
            localStorage.setItem(`liked_${productId}`, 'false');
            showToast(`Đã bỏ thích ${product.name}`, 'info');
        } else {
            // Thích
            likeBtn.classList.add('liked');
            likeBtn.innerHTML = '❤️';
            localStorage.setItem(`liked_${productId}`, 'true');
            showToast(`Đã thích ${product.name} ❤️`, 'success');
        }
    });

    return card;
}

// Hiển thị toast thông báo đẹp
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Hiện toast
    setTimeout(() => toast.classList.add('show'), 10);

    // Ẩn và xóa sau 3 giây
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Render toàn bộ danh sách
function renderProducts() {
    const container = document.getElementById('product-list');
    container.innerHTML = '';

    products.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

// ================== KHỞI ĐỘNG ==================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    console.log('%cTrang sản phẩm đã load thành công!', 'color: green; font-weight: bold');
});