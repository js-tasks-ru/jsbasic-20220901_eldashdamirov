// function factorial(n) {
//   if (n === 0){
//     return 1;
//   }else{
//     return n * factorial(n-1)
//   }
// }

 function factorial(n) {
    let result = 1
  
    for (let i = 0; i < n; i++) {
      result *= i + 1
    }
    return result
  }
  
  console.log(factorial(1))
