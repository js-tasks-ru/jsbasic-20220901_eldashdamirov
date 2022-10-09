import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    // ... ваш код
    this.carousel = new Carousel(slides);
    this.containerCarousel = document.body.querySelector('[data-carousel-holder]');
    this.containerCarousel.append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    this.containerRibbon = document.querySelector('[data-ribbon-holder]');
    this.containerRibbon.append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    this.containerSlider = document.querySelector('[data-slider-holder]')
    this.containerSlider.append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    this.cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    this.cartIconHolder.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    this.response = await fetch("products.json");
    if (this.response.ok) {
      this.products = await this.response.json();
    }

    this.productsGrid = new ProductsGrid(this.products);
    this.containerProductsGrid = document.querySelector('[data-products-grid-holder]');
    this.containerProductsGrid.innerHTML = '';
    this.containerProductsGrid.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener("product-add", (evt) => {
      this.product = this.products.find((item) => item.id === evt.detail);
      this.cart.addProduct(this.product);
    });

    this.containerSlider.addEventListener('slider-change', (evt) => {
      this.productsGrid.updateFilter({
        maxSpiciness: evt.detail // 
      });
    });

    this.containerRibbon.addEventListener('ribbon-select', (evt) => {
      this.productsGrid.updateFilter({
        category: evt.detail // 
      });
    });

    document.getElementById("nuts-checkbox").addEventListener("change", (evt) => {
      this.productsGrid.updateFilter({
        noNuts: evt.target.checked // 
      });
    });

    document.getElementById("vegeterian-checkbox").addEventListener("change", (evt) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: evt.target.checked // 
      });
    });

  }
}