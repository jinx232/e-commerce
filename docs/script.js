
'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header sticky & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);



/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);



/**
 * Fetch and display products from the API
 */

const fetchProducts = async () => {
  const productListContainer = document.querySelector('[data-product-list]');
  if (!productListContainer) {
    console.error('Product list container with [data-product-list] not found!');
    return;
  }

  try {
    const response = await fetch('./products.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json();

    // Clear the loading message
    productListContainer.innerHTML = '';

    if (products.length === 0) {
      productListContainer.innerHTML = '<li><p>No products found.</p></li>';
      return;
    }

    products.forEach(product => {
      const productItem = document.createElement('li');

      // Assuming a structure that matches a modern e-commerce theme.
      // You can customize this HTML to match your project's design.
      productItem.innerHTML = `
        <div class="product-card" tabindex="0">
          <figure class="card-banner">
            <img src="${product.image_url}" width="312" height="350" loading="lazy"
              alt="${product.name}" class="image-contain">
          </figure>
          <div class="card-content">
            <h3 class="h3 card-title">
              <a href="#">${product.name}</a>
            </h3>
            <data class="card-price" value="${product.price}">$${product.price.toFixed(2)}</data>
          </div>
        </div>
      `;
      productListContainer.appendChild(productItem);
    });

  } catch (error) {
    console.error('Could not fetch products:', error);
    productListContainer.innerHTML = '<li><p>Error loading products. Please try again later.</p></li>';
  }
};

// Run the fetchProducts function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', fetchProducts);
