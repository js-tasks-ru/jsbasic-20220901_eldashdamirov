let calculator = {
  sum() {
    return this.a + this.b;
  },

  mul() {
    return this.a * this.b;
  },

  read(a, b) {
    this.a =Number(a);
    this.b = Number(b);
  }
};

calculator.read(3,5);
console.log( calculator.sum() );
console.log( calculator.mul() );


