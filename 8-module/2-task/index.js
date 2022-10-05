import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    
    let productCards = [];
    let cardsHTML = [];
    this.products.forEach(function (item, count) {
      productCards[count] = new ProductCard(item);
      cardsHTML[count] = productCards[count].elem.outerHTML;
    });
    this.productCards = productCards;
    this.cardsHTML = cardsHTML.join('');

    this.render();
  }

  render() { 
    this._elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
         ${this.cardsHTML} 
      </div>
    </div>
    `);
  }

  updateFilter(filters) {
    for(let item of this._elem.querySelectorAll('.card')) {
      item.remove();
    }
    this.filters = Object.assign(this.filters, filters);
    let nnuts, vegan, spice, cat;
    let i = 0;
    for (let item of this.products) {
      if(this.filters.noNuts) nnuts = (this.filters.noNuts !== item.nuts); else nnuts = true;
      if (this.filters.vegeterianOnly) vegan = (this.filters.vegeterianOnly === item.vegeterian); else vegan = true;
      if (this.filters.maxSpiciness + 1) spice = (this.filters.maxSpiciness + 1 >= item.spiciness + 1); else spice = true;
      if (this.filters.category) cat = (this.filters.category === item.category); else cat = true;
      
      if (nnuts && vegan && spice && cat) this._elem.querySelector('.products-grid__inner').append(this.productCards[i].elem);
      i++;
    }
  }

  get elem() {
    return this._elem;
  }
}