import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.render();

    this._elem.querySelector(".slider__thumb").style.left = ((this.value + 1) / this.steps * 100) + '%';
    this._elem.querySelector(".slider__progress").style.width = ((this.value + 1) / this.steps * 100) + '%';
    this._elem.querySelector('.slider__value').innerHTML = this.value;
    this._elem.querySelector('.slider__steps').firstElementChild.classList.add('slider__step-active');

    this._elem.querySelector('.slider__thumb').ondragstart = () => false;
    this._elem.querySelector('.slider__thumb').onpointerdown = () => false;
    this._elem.querySelector('.slider__thumb').onpointermove = () => false;

    this.eventListeners();

  }

  eventListeners() {
    this._elem.addEventListener("pointerdown", (evt) => {
      if (evt.target.classList == 'slider__thumb') {
        this._elem.classList.add('slider_dragging');

        this.onMouseMove = (event) => {
          this.leftRelative = (event.clientX - this._elem.getBoundingClientRect().left) / this._elem.offsetWidth;

          if (this.leftRelative < 0) { this.leftRelative = 0; }
          if (this.leftRelative > 1) { this.leftRelative = 1; }
          this.leftPercents = this.leftRelative * 100;

          this._elem.querySelector(".slider__thumb").style.left = `${this.leftPercents}%`;
          this._elem.querySelector(".slider__progress").style.width = `${this.leftPercents}%`;

          this.segments = this.steps - 1;
          this.approximateValue = this.leftRelative * this.segments;
          this.step = Math.round(this.approximateValue);
          this._elem.querySelector('.slider__value').innerHTML = this.step;
        };
                
        document.addEventListener("pointermove", this.onMouseMove);
        document.addEventListener("pointerup", (evt) => {
          this._elem.classList.remove('slider_dragging');
          document.removeEventListener("pointermove", this.onMouseMove);
          this.onMouseMove = null;

          this.event = new CustomEvent("slider-change", {
            detail: this.step,
            bubbles: true
          });
          this._elem.dispatchEvent(this.event);

        });
      }
    });

    this._elem.addEventListener("click", (evt) => {
      this.leftRelative = (evt.clientX - this._elem.getBoundingClientRect().left) / this._elem.offsetWidth;
      this.segments = this.steps - 1;
      this.approximateValue = this.leftRelative * this.segments;
      this.step = Math.round(this.approximateValue);
      this.stepPercents = this.step / this.segments * 100 + '%';
      this._elem.querySelector('.slider__value').innerHTML = this.step;

      let i = 0;
      for (let prop of this._elem.querySelector('.slider__steps').children) {
        if (i === this.step) prop.classList.add('slider__step-active');
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

  get elem() {
    return this._elem;
  }

}
