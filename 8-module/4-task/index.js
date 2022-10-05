import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {
      this.product = product;
      if (this.isEmpty()) {
        this.cartItems.push({ product: this.product, count: 1 });
        this.onProductUpdate({ product: this.product, count: 1 });
      }
      else {
        let findResult = this.cartItems.find(item => this.product.id === item.product.id);
        if (findResult) {
          findResult.count++;
          this.onProductUpdate({product: findResult.product, count: findResult.count});
        }
        else {
          this.cartItems.push({ product: this.product, count: 1 });
          this.onProductUpdate({ product: this.product, count: 1 });
        }
      }
    }
  }

  updateProductCount(productId, amount) {
    let findResult = this.cartItems.findIndex(item => productId === item.product.id);
    if (this.cartItems[findResult]) {
      if (Number(amount) > 0) {
        this.cartItems[findResult].count++;
        this.onProductUpdate(this.cartItems[findResult]);
      }
      else if (Number(amount) < 0) {
        this.cartItems[findResult].count--;
        this.onProductUpdate(this.cartItems[findResult]);
        if (this.cartItems[findResult].count <= 0) {
          this.cartItems.splice(findResult, 1);
        }
      }
    }
  }

  isEmpty() {
    if (this.cartItems.length === 0) return true;
    else return false;
  }

  getTotalCount() {
    let resultSum = 0;
    this.cartItems.forEach((item) => {
      resultSum += item.count;
    });
    return resultSum;
  }

  getTotalPrice() {
    let resultPrice = 0;
    this.cartItems.forEach((item) => {
      resultPrice += item.product.price * item.count;
    });
    return resultPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    let cartItemsHTML = '';
    for (let item of this.cartItems) {
      cartItemsHTML += this.renderProduct(item.product, item.count).outerHTML;
    }  
    this.modal.setBody(createElement(`<div>${cartItemsHTML}<\div><div>${this.renderOrderForm().outerHTML}</div>`));

    this.modal.open();
    
    this.modal.elem.querySelector('.cart-form').onsubmit = (event) => this.onSubmit(event);

    this.modal.elem.querySelector('.modal__body').onclick = (evt) => {
      if (evt.target.closest('.cart-counter__button')) {
        let productIdNew = '';
        productIdNew = evt.target.closest('.cart-product').getAttribute('data-product-id');

        if (evt.target.closest('.cart-counter__button').className.includes('plus')) {
          this.updateProductCount(productIdNew, '+1');
        }
        else if (evt.target.closest('.cart-counter__button').className.includes('minus')) {
          this.updateProductCount(productIdNew, '-1');
        }
      }
    };
  } 

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (document.body.className === 'is-modal-open') {
      for (let item of this.modal.elem.querySelectorAll('.cart-product')) {
        if (item.getAttribute('data-product-id') === cartItem.product.id) {
          item.querySelector('.cart-counter__count').textContent = cartItem.count;
          item.querySelector('.cart-product__price').textContent = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
        }
      }
      this.modal.elem.querySelector('.cart-buttons__info-price').textContent = `€${this.getTotalPrice().toFixed(2)}`;
      if (this.getTotalCount() === 0) {
        this.modal.close();
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();
    event.target.querySelector('[type=submit]').classList.add('is-loading');
    this.formData = new FormData(event.target.closest('.cart-form'));
   
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: this.formData
    }).then(response => { 
      if(response.ok === true) {
        this.modal.setTitle('Success!');  
        this.cartItems.splice(0, this.cartItems.length);
        this.cartIcon.update(this);
        this.modal.setBody(createElement(`
        <div class="modal__body-inner">
        <p>
         Order successful! Your order is being cooked :) <br>
         We’ll notify you about delivery time shortly.<br>
         <img src="/assets/images/delivery.gif">
        </p>
        </div>
      `));
      }
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}