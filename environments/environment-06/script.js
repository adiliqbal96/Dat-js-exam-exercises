"use strict";

// Step 1: Load the JSON file and display the list of products
fetch("products.json")
  .then((response) => response.json())
  .then((products) => {
    const productsContainer = document.getElementById("products");

    products.forEach((product) => {
      const productArticle = document.createElement("article");

      productArticle.innerHTML = `
        <h3>${product.name}</h3>
        <p>Weight: ${product.weight}g</p>
        <p>Price: ${product.price},-</p>
        <button>Add to basket</button>
      `;

      productArticle.querySelector("button").addEventListener("click", () => {
        addToBasket(product);
        displayBasket();
      });

      productsContainer.appendChild(productArticle);
    });
  });

// Step 2: Create a global basket array and a function to add products to it
let basket = [];

function addToBasket(product) {
  basket.push(product);
}

// Step 3: Display the contents of the basket
function displayBasket() {
  const basketContainer = document
    .getElementById("basket")
    .querySelector("tbody");
  basketContainer.innerHTML = "";

  basket.forEach((product, index) => {
    const basketItem = document.createElement("tr");

    basketItem.innerHTML = `
      <td>
        <button class="remove">-</button>
        ${index + 1}
        <button class="add">+</button>
      </td>
      <td>${product.name}</td>
      <td>${product.price},-</td>
      <td>${product.price * (index + 1)},-</td>
    `;

    basketContainer.appendChild(basketItem);
  });
}
