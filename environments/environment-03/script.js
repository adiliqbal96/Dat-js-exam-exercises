"use strict";

// Question 1: Create a list with three 'product' objects.
let products = [
  { name: "Product 1", price: 50, inStock: true },
  { name: "Product 2", price: 100, inStock: false },
  { name: "Product 3", price: 150, inStock: true },
];

// Question 2: Function that displays all 'product' objects where 'inStock' is 'true'.
function displayProducts() {
  let listContainer = document.getElementById("list-container");
  listContainer.innerHTML = ""; // Clear the container

  // Sort and filter products, only showing the ones 'inStock'
  products
    .filter((product) => product.inStock)
    .forEach((product) => {
      let productElement = document.createElement("p");
      productElement.textContent = `Name: ${product.name}, Price: ${product.price}`;
      listContainer.appendChild(productElement);
    });
}

// Initial display of products
displayProducts();

// Question 3: Function that creates a new 'product' object and adds it to the list.
document
  .getElementById("create-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get values from the form
    let name = document.getElementById("product-name").value;
    let price = document.getElementById("product-price").value;
    let inStock = document.getElementById("stock").checked;

    // Create new product object
    let newProduct = { name: name, price: Number(price), inStock: inStock };

    // Add new product to the global list
    products.push(newProduct);

    // Clear the form
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("stock").checked = false;

    // Update the product list display
    displayProducts();
  });
