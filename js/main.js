console.log("JS is working");

const techSection = document.getElementById("tech-section");
const medicalSection = document.getElementById("medical-section");

function displayProducts() {
    // 1. بناء هيكل قسم الإلكترونيات داخلياً
    if (techSection) {
        techSection.innerHTML = `
            <h2 class="section-title">Tech Store 💻</h2>
            <div class="section-divider"></div>
            <div id="products" class="products"></div>
        `;
    }

    // 2. بناء هيكل قسم المنتجات الطبية داخلياً
    if (medicalSection) {
        medicalSection.innerHTML = `
            <h2 class="section-title">Medical Products 🩺</h2>
            <div class="section-divider"></div>
            <div id="medical-products" class="products"></div>
        `;
    }

    // مسك الحاويات الداخلية اللي لسه صانعينها حالا
    const techContainer = document.getElementById("products");
    const medicalContainer = document.getElementById("medical-products");

    let techHTML = "";
    let medicalHTML = ""; 

    // لف على المنتجات وتوزيعها
    products.forEach(product => {
        let cardHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add To Cart</button>
            </div>
        `;

        if (product.category === "medical") {
            medicalHTML += cardHTML;
        } else {
            techHTML += cardHTML;
        }
    });

    if (techContainer) techContainer.innerHTML = techHTML;
    if (medicalContainer) medicalContainer.innerHTML = medicalHTML;
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = products.find(p => p.id === id);
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); 
    alert("Added to cart ✓");
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countElement = document.getElementById("cart-count");
    if (countElement) {
        countElement.innerText = cart.length;
    }
}

displayProducts();
updateCartCount();


// فانكشن استقبال بيانات الطلب من العميل
function handleOrder(event) {
    event.preventDefault(); // منع الصفحة من الريفرش التلقائي عند الإرسال

    const name = document.getElementById("clientName").value;
    const phone = document.getElementById("clientPhone").value;
    const address = document.getElementById("clientAddress").value;

    // جلب المنتجات اللي في العربة عشان نربطها بالطلب (اختياري)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("عذراً يا غالي، عربة التسوق فارغة! ضيف منتجات الأول قبل إرسال الطلب. 🛒");
        return;
    }

    // هنا تقدر تبعت الداتا لأي سيرفر مستقبلاً، حالياً هنطلع رسالة نجاح عظمى للزبون
    alert(`شكراً لثقتك بنا يا ${name} ❤️\nتم استلام طلبك بنجاح وسنتواصل معك على الرقم ${phone} لشحن المنتجات إلى: ${address}.`);

    // تفريغ العربة والفورم بعد النجاح
    localStorage.removeItem("cart");
    if (typeof updateCartCount === "function") updateCartCount();
    document.getElementById("orderForm").reset();
}
