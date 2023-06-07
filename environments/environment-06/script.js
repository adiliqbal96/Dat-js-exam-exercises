"use strict";

// Global variables
let products = [];
let basket = [];

// Step 1: Load the JSON file and display products on the page
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    displayProducts(products);
  });

// Function to display products on the page
function displayProducts(products) {
  const productsSection = document.getElementById("products");

  products.forEach((product) => {
    const article = document.createElement("article");

    const h3 = document.createElement("h3");
    h3.textContent = product.name;

    const weightPara = document.createElement("p");
    weightPara.textContent = `Weight: ${product.weight} g`;

    const pricePara = document.createElement("p");
    pricePara.textContent = `Price: ${product.price},-`;

    const button = document.createElement("button");
    button.textContent = "Add to basket";
    button.addEventListener("click", () => {
      addToBasket(product);
      showBasket();
    });

    article.appendChild(h3);
    article.appendChild(weightPara);
    article.appendChild(pricePara);
    article.appendChild(button);

    productsSection.appendChild(article);
  });
}

// Function to add a product to the basket
function addToBasket(product) {
  // Check if product is already in the basket
  const foundProduct = basket.find(
    (item) => item.product.name === product.name
  );

  // If the product is already in the basket, increment its quantity
  if (foundProduct) {
    foundProduct.quantity++;
  } else {
    // If the product is not in the basket, add it with a quantity of 1
    basket.push({ product, quantity: 1 });
  }
}

// Function to remove a product from the basket
function removeFromBasket(product) {
  // Find the product in the basket
  const foundProduct = basket.find(
    (item) => item.product.name === product.name
  );

  // If the product is found and its quantity is greater than 1, decrement its quantity
  if (foundProduct && foundProduct.quantity > 1) {
    foundProduct.quantity--;
  } else if (foundProduct && foundProduct.quantity === 1) {
    // If the product's quantity is 1, remove the product from the basket
    basket = basket.filter((item) => item.product.name !== product.name);
  }

  showBasket(); // Refresh basket view after removal
}

// Function to display the contents of the basket on the page
function showBasket() {
  const basketTbody = document.querySelector("#basket tbody");
  basketTbody.innerHTML = ""; // Clear the basket view

  basket.forEach((basketItem) => {
    const tr = document.createElement("tr");

    const quantityTd = document.createElement("td");
    const addButton = document.createElement("button");
    addButton.textContent = "+";
    addButton.addEventListener("click", () => {
      addToBasket(basketItem.product);
      showBasket();
    });
    const removeButton = document.createElement("button");
    removeButton.textContent = "-";
    removeButton.addEventListener("click", () => {
      removeFromBasket(basketItem.product);
    });
    quantityTd.append(removeButton, basketItem.quantity, addButton);

    const nameTd = document.createElement("td");
    nameTd.textContent = basketItem.product.name;

    const pricePerItemTd = document.createElement("td");
    pricePerItemTd.textContent = `${basketItem.product.price},-`;

    const totalPriceTd = document.createElement("td");
    totalPriceTd.textContent = `${
      basketItem.product.price * basketItem.quantity
    },-`;

    tr.append(quantityTd, nameTd, pricePerItemTd, totalPriceTd);

    basketTbody.appendChild(tr);
  });
}
