function  ucFirst(str){
  if(str === ''){
    return str
  }
  return str[0].toUpperCase() + str.substring(1) ;
}

console.log(ucFirst('ABC'))
console.log(ucFirst(''))
console.log(ucFirst('A'))

