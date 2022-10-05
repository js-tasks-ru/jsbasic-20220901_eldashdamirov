import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.activeSlide = 0;
    this.maxSlides = this.slides.length;

    this.render();
    this.plusButton();
    this.arrowRight();
    this.arrowLeft();
    this.arrowsVisibility();
  }

  plusButton() {
    this._elem.querySelector(".carousel__inner").addEventListener("click", (evt) => {
      if (evt.target.closest(".carousel__button")) {
        this.event = new CustomEvent("product-add", {
          detail: this.slides[Math.abs(this.activeSlide)].id,
          bubbles: true
        });
        this._elem.querySelector(".carousel__button").dispatchEvent(this.event);
      }
    });
    this._elem.querySelector(".carousel__button").addEventListener("product-add", (evt) => {
    });
  }

  arrowRight() {
    this._elem.querySelector(".carousel__arrow_right").addEventListener("click", () => {
      this.activeSlide--;
      this._elem.querySelector('.carousel__inner')
          .style
          .transform = 'translateX(' + this._elem.offsetWidth * this.activeSlide + 'px)';
      this.arrowsVisibility();
    });
  }

  arrowLeft() {
    this._elem.querySelector(".carousel__arrow_left").addEventListener("click", () => {
      this.activeSlide++;
      this._elem.querySelector('.carousel__inner')
          .style
          .transform = 'translateX(' + this._elem.offsetWidth * this.activeSlide + 'px)';
      this.arrowsVisibility();
    });
  }

  arrowsVisibility() {
    this.right = this._elem.querySelector(".carousel__arrow_right");
    this.left = this._elem.querySelector(".carousel__arrow_left");

    if (this.activeSlide <= (this.maxSlides - 1)) {
      this.right.style.display = 'none';
      this.left.style.display = '';
    }

    if (this.activeSlide >= 0) {
      this.right.style.display = '';
      this.left.style.display = 'none';
    }
    if ((this.activeSlide < 0) && (this.activeSlide > -(this.maxSlides - 1))) {
      this.right.style.display = '';
      this.left.style.display = '';
    }
  }

  render() {
    this.allSlides = this.slides.map(function (slide) {
      return `<div class="carousel__slide" data-id="${slide.id}">
      <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slide.price.toFixed(2)}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
         <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`;
    }).join('');

    this._elem = createElement(`<div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
    <div class = 'carousel__inner'>
    ${this.allSlides}
      </div>
     </div>`
    );
  }

  get elem() { 
    return this._elem;
  }

}