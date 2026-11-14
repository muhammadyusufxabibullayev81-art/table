
const products = [
    {
        id: 1,
        name: "Zamonaviy ish stoli",
        category: "stol",
        price: 1250000,
        image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=700",
        description: "Kompyuter va o‘qish uchun qulay stol."
    },
    {
        id: 2,
        name: "Yog‘och yozuv stoli",
        category: "stol",
        price: 980000,
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=700",
        description: "Mustahkam va chiroyli tabiiy yog‘och."
    },
    {
        id: 3,
        name: "Zamonaviy ofis stoli",
        category: "stol",
        price: 1750000,
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=700",
        description: "Ishxonangiz uchun ajoyib tanlov."
    },
    {
        id: 4,
        name: "Yumshoq kreslo",
        category: "stul",
        price: 850000,
        image: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=700",
        description: "Uzoq vaqt o‘tirish uchun qulay."
    },
    {
        id: 5,
        name: "Yog‘och stul",
        category: "stul",
        price: 450000,
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=700",
        description: "Oddiy, mustahkam va zamonaviy."
    },
    {
        id: 6,
        name: "Zamonaviy uy mebeli",
        category: "mebel",
        price: 3200000,
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700",
        description: "Uyingiz uchun chiroyli mebel."
    },
    {
        id: 7,
        name: "Kichik kompyuter stoli",
        category: "stol",
        price: 790000,
        image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=700",
        description: "Ixcham va juda qulay dizayn."
    },
    {
        id: 8,
        name: "Yog‘och javon",
        category: "mebel",
        price: 1150000,
        image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=700",
        description: "Kitob va buyumlaringiz uchun."
    },
    {
        id: 9,
        name: "Yumshoq uy kreslosi",
        category: "stul",
        price: 1350000,
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=700",
        description: "Dam olish uchun qulay kreslo."
    },
    {
        id: 10,
        name: "Katta ovqatlanish stoli",
        category: "stol",
        price: 2100000,
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=700",
        description: "Oila davrasidagi yoqimli lahzalar uchun."
    },
    {
        id: 11,
        name: "Zamonaviy javon",
        category: "mebel",
        price: 1450000,
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=700",
        description: "Xonangizga chiroy qo‘shadi."
    },
    {
        id: 12,
        name: "Yog‘och stul to‘plami",
        category: "stul",
        price: 1600000,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700",
        description: "Sifatli va qulay stullar."
    }
];

let cart = [];

function formatPrice(price) {
    return price.toLocaleString("uz-UZ");
}

function showProducts(list) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    if (list.length === 0) {
        productList.innerHTML = "<p>Mahsulot topilmadi.</p>";
        return;
    }

    list.forEach(product => {
        productList.innerHTML += `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="price">${formatPrice(product.price)} so‘m</div>
                    <button class="add-button" onclick="addToCart(${product.id})">
                        + Savatga qo‘shish
                    </button>
                    <div class="add-message" id="message-${product.id}"></div>
                </div>
            </div>
        `;
    });
}

function addToCart(id) {
    const product = products.find(item => item.id === id);
    const found = cart.find(item => item.id === id);

    if (found) {
        found.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    document.getElementById("message-" + id).textContent = "✓ Savatga qo‘shildi!";
    updateCart();
}

function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = count;

    const items = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");

    items.innerHTML = "";

    if (cart.length === 0) {
        items.innerHTML = '<div class="empty-cart">Savatingiz hozircha bo‘sh.</div>';
    }

    let sum = 0;

    cart.forEach(item => {
        sum += item.price * item.quantity;

        items.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>${formatPrice(item.price)} so‘m × ${item.quantity}</p>
                </div>
                <button class="remove-button" onclick="removeItem(${item.id})">
                    O‘chirish
                </button>
            </div>
        `;
    });

    total.textContent = formatPrice(sum);
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function openCart() {
    document.getElementById("cart-modal").style.display = "flex";
    updateCart();
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

function checkout() {
    if (cart.length === 0) {
        showToast("Savatingiz bo‘sh!");
        return;
    }

    showToast("Buyurtmangiz qabul qilindi!");
    cart = [];
    updateCart();
    closeCart();
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function filterProducts() {
    const search = document.getElementById("search").value.toLowerCase();
    const category = document.getElementById("category-filter").value;

    const filtered = products.filter(product => {
        const matchesName = product.name.toLowerCase().includes(search);
        const matchesCategory = category === "all" || product.category === category;

        return matchesName && matchesCategory;
    });

    showProducts(filtered);
}

document.getElementById("search").addEventListener("input", filterProducts);
document.getElementById("category-filter").addEventListener("change", filterProducts);

document.getElementById("newsletter-form").addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("newsletter-message").textContent = "Obunangiz qabul qilindi!";
    this.reset();
});

document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("contact-message").textContent = "Xabaringiz yuborildi!";
    this.reset();
});

document.getElementById("cart-modal").addEventListener("click", function(e) {
    if (e.target === this) closeCart();
});

showProducts(products);
updateCart();
