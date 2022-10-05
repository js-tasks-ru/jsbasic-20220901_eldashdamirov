export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if(product) {
      this.product = product;

      if (this.isEmpty()) {
        this.cartItems.push({product: this.product, count: 1});
        this.onProductUpdate({ product: this.product, count: 1 });
      }
      else {

        let findResult = this.cartItems.find(item => this.product.id === item.product.id); 
        if (findResult) {
          findResult.count++;
          this.onProductUpdate(findResult);
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
      if (amount > 0) {
        this.cartItems[findResult].count++;
        this.onProductUpdate(this.cartItems[findResult]);
      }
      else if (amount < 0) {
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}