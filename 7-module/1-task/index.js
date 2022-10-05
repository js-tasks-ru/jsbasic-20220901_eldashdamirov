import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.ribbonInner = this._elem.querySelector(".ribbon__inner");
    this.ribbonArrowRight = this._elem.querySelector(".ribbon__arrow_right");
    this.ribbonArrowLeft = this._elem.querySelector(".ribbon__arrow_left");   
    this.ribbonItem = this._elem.querySelectorAll(".ribbon__item");
    this.buttonRight();
    this.buttonLeft();
    this.scroll();
    this.choiseCat();

    if (this.ribbonInner.scrollLeft === 0) {
      this.ribbonArrowLeft.classList.remove("ribbon__arrow_visible");
    } else (this.ribbonArrowLeft.classList.add("ribbon__arrow_visible"));

  }

  scroll () {
    this.ribbonInner.addEventListener("scroll", () => {
      this.scrollRight = this.ribbonInner.scrollWidth - this.ribbonInner.scrollLeft - this.ribbonInner.clientWidth;
      if (this.scrollRight < 1) {
        this.ribbonArrowRight.classList.remove("ribbon__arrow_visible");
      } else (this.ribbonArrowRight.classList.add("ribbon__arrow_visible"));

      if (this.ribbonInner.scrollLeft === 0) {
        this.ribbonArrowLeft.classList.remove("ribbon__arrow_visible");
      } else (this.ribbonArrowLeft.classList.add("ribbon__arrow_visible"));
    });
  }

  buttonRight () {
    this.ribbonArrowRight.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.ribbonInner.scrollBy(350, 0);
    });
  }
  buttonLeft() {
    this.ribbonArrowLeft.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.ribbonInner.scrollBy(-350, 0);
    });
  }

  choiseCat () {
    this.ribbonInner.addEventListener("click", evt => {
      evt.preventDefault();
      this.event = new CustomEvent("ribbon-select", {
        detail: evt.target.getAttribute("data-id"),
        bubbles: true
      });
      this._elem.dispatchEvent(this.event);

      for (let prop of this.ribbonItem) {
        prop.classList.remove("ribbon__item_active");
        evt.target.classList.add("ribbon__item_active");
      }
    });
  }

  render () {
    this.allCategories = this.categories.map(function (category) {
      return `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`;
    }).join('');

    this._elem = createElement(`<div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner">
    ${this.allCategories}
    </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
     </div>`
    );
  }

  get elem () {
    return this._elem;
  }

}