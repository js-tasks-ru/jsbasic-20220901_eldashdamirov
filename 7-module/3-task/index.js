import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.render();

    this._elem.querySelector(".slider__thumb").style.left = 0;
    this._elem.querySelector(".slider__progress").style.width = 0;
    this._elem.querySelector('.slider__value').innerHTML = this.value;
    this._elem.querySelector('.slider__steps').firstElementChild.classList.add('slider__step-active');

    this._elem.addEventListener("click", (evt) => {
      this.leftRelative = (evt.clientX - this._elem.getBoundingClientRect().left) / this._elem.offsetWidth;
      this.segments = this.steps - 1;
      this.approximateValue = this.leftRelative * this.segments;
      this.step = Math.round(this.approximateValue);
      this.stepPercents = this.step / this.segments * 100 + '%';
      this._elem.querySelector('.slider__value').innerHTML = this.step;

      let i = 0;
      for (let prop of this._elem.querySelector('.slider__steps').children) {
        if(i === this.step) prop.classList.add('slider__step-active');
        else prop.classList.remove('slider__step-active');
        i++;			
      }

      this._elem.querySelector(".slider__thumb").style.left = this.stepPercents;
      this._elem.querySelector(".slider__progress").style.width = this.stepPercents;

      this.event = new CustomEvent("slider-change", {
        detail: this.step,
        bubbles: true
      });
      this._elem.dispatchEvent(this.event);
    });

  }

  render() {
    this.stepSpans = '';
    for (let i = 0; i < this.steps; i++) {
      this.stepSpans += '<span></span>';
    }

    this._elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${this.stepSpans}
        </div>
     </div>
	  `);
  }

  get elem () {
    return this._elem;
  }

}