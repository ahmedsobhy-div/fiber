const cartContainer = document.getElementById("cart-items");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartContainer.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<h2>Cart is empty 😢</h2>";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;

    cartContainer.innerHTML += `
      <div class="product-card">
        <img src="${item.image}">
        <h3>${item.title}</h3>
        <p>$${item.price}</p>

        <button onclick="removeItem(${index})">
          Remove
        </button>
      </div>
    `;
  });

  cartContainer.innerHTML += `
    <h2 style="text-align:center; margin-top:20px;">
      Total: $${total}
    </h2>
  `;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();